import * as d3 from 'd3';
export class PunchCard {
  private chart;
  private color = '#7d8ead';
  private data;
  private height = 520;
  private innerHeight;
  private innerWidth;
  private margin = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 100
  };
  private r;
  private target;
  private unitHeight;
  private unitSize;
  private unitWidth;
  private width = 1440;
  private x;
  private xAxis;
  private xticks = [
    '12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
  private y;
  private yAxis;
  private yticks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(options) {
    Object.assign(this, options);
    this._init();
  }

  public render(data) {
    data = (data || []).filter((d) => {
      return Array.isArray(d) &&
        d.length === 3 &&
        d[0] >= 0 &&
        d[0] <= 6 &&
        d[1] >= 0 &&
        d[1] <= 23;
    });

    this.data = data;
    this._renderCard();
  };

  public clear() {
    this.chart.selectAll('*').remove();
  };

  private _init() {
    let width = this.width;
    let height = this.height;
    let margin = this.margin;

    let innerWidth = this.innerWidth = width - margin.left - margin.right;
    let innerHeight = this.innerHeight = height - margin.top - margin.bottom;
    let unitWidth = this.unitWidth = innerWidth / 24;
    let unitHeight = this.unitHeight = innerHeight / 7;

    this.unitSize = Math.min(unitWidth, unitHeight);

    this.chart = d3.select(this.target)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    this.x = d3.scaleLinear().domain([0, 23]).range([unitWidth / 2, innerWidth - unitWidth / 2]);

    this.y = d3.scaleLinear().domain([0, 6]).range([unitHeight / 2, innerHeight - unitHeight / 2]);

    this.xAxis = d3.axisBottom(this.x).ticks(24).tickFormat((d, i) => this.xticks[i]);

    this.yAxis = d3.axisLeft(this.y).ticks(7).tickFormat((d, i) => this.yticks[i]);

    this._renderAxis();
  }

  private _renderCard() {
    let data = this.data;
    let maxVal = d3.max(data, (d) => d[2]);

    this.r = d3.scaleSqrt().domain([0, parseInt(maxVal, 0)]).range([0, this.unitSize / 4]);

    let circles = this.chart.selectAll('circle').data(data);

    let updates = [circles, circles.enter().append('circle')];
    updates.forEach((group) => {
      group
        .attr('cx', (d) => this.x(d[1]))
        .attr('cy', (d) => this.y(d[0]))
        .attr('r', (d) => this.r(d[2]))
        .style('fill', this.color);
    });

    circles.exit().remove();
  }
  private _renderAxis() {
    this.chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + this.innerHeight + ')')
      .call(this.xAxis);

    this.chart.append('g').attr('class', 'y axis').call(this.yAxis);
  }
}
