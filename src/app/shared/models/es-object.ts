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

export class ESObject {
  public aggs: Aggs;
  public query: Query;
  public size: number;

  constructor() {
    this.aggs = new Aggs();
    this.query = new Query();
    this.size = 0;
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
