export class Terms {
  public 'state.Power'?: number[];
  public 'state.target'?: string[];
}

export class StateDate {
  public gte: number;
  public lte: number;

  constructor(gte: number, lte: number) {
    this.gte = gte;
    this.lte = lte;
  }
}

export class Range {
  public 'state.date': StateDate;

  constructor(gte: number, lte: number) {
    this['state.date'] = new StateDate(gte, lte);
  }
}

export class Must {
  public terms?: Terms;
  public range?: Range;
}

export class Bool {
  public must: Must[];

  constructor() {
    this.must = [];
  }
}

export class Filter {
  public bool: Bool;

  constructor() {
    this.bool = new Bool();
  }
}

export class Filtered {
  public filter: Filter;

  constructor() {
    this.filter = new Filter();
  }
}

export class Query {
  public filtered: Filtered;

  constructor() {
    this.filtered = new Filtered();
  }
}

export class DateHistogram {
  public field: string;
  public interval: string;
  public 'time_zone': string;

  constructor() {
    this.field = 'state.date';
    this.time_zone = '+08:00';
  }
}

export class ByTime {
  public 'date_histogram': DateHistogram;

  constructor() {
    this.date_histogram = new DateHistogram();
  }
}

export class AggsTerms {
  public field: string;

  constructor() {
    this.field = 'state.target';
  }
}

export class ByTarget {
  public terms: AggsTerms;

  constructor() {
    this.terms = new AggsTerms();
  }
}

export class Aggs {
  public byTime: ByTime;
  public byTarget?: ByTarget;

  constructor() {
    this.byTime = new ByTime();
  }
}

/**
 * ES Query Object
 *
 * @export
 * @class ESObject
 */
export class ESObject {
  public aggs: Aggs;
  public query: Query;
  public size: number;

  constructor() {
    this.aggs = new Aggs();
    this.query = new Query();
    this.size = 0;
  }

  /**
   * set power query option
   *
   * @param {boolean} power
   *
   * @memberOf ESObject
   */
  public setPower(power: boolean) {
    let must = new Must();
    must.terms = new Terms();
    must.terms['state.Power'] = [power ? 1 : 0];
    this.query.filtered.filter.bool.must.push(must);
  }

  /**
   * set query targets
   *
   * @param {string[]} targets(kiiThingID)
   *
   * @memberOf ESObject
   */
  public setTarget(targets: string[]) {
    let must = new Must();
    must.terms = new Terms();
    must.terms['state.target'] = targets;
    this.query.filtered.filter.bool.must.push(must);
  }

  /**
   * set query time range and interval
   *
   * @param {number} startTime
   * @param {number} endTime
   * @param {string} interval
   *
   * @memberOf ESObject
   */
  public setTimeRange(startTime: number, endTime: number, interval: string) {
    let must = new Must();
    must.range = new Range(startTime, endTime);
    this.query.filtered.filter.bool.must.push(must);
    this.aggs.byTime.date_histogram.interval = interval;
  }

  /**
   * let the query is grouped by target
   *
   *
   * @memberOf ESObject
   */
  public setGroupByTarget() {
    this.aggs.byTarget = new ByTarget();
  }

  /**
   * set query option
   *
   * @param {ESQueryOption} esQueryOption
   *
   * @memberOf ESObject
   */
  public setOption(esQueryOption: ESQueryOption) {
    this.setPower(esQueryOption.power);
    this.setTarget(esQueryOption.target);
    this.setTimeRange(esQueryOption.startTime, esQueryOption.endTime, esQueryOption.interval);

    if (esQueryOption.groupByTarget) {
      this.setGroupByTarget();
    }
  }
}

export interface ESQueryOption {
  endTime: number;
  groupByTarget: boolean;
  interval: string;
  power: boolean;
  startTime: number;
  target: string[];
}