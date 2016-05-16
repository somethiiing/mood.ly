import React from 'react';
import ReactDOM from 'react-dom';

function createChart(dom, props) {
  let width = props.width;
  const height = props.height;
  width = width + 200;
  const data = props.data;
  const sum = data.reduce((memo, num) => memo + num.count, 0);

  const chart = d3.select(dom)
  .append('svg')
  .attr('class', 'd3')
  .attr('width', width)
  .attr('height', height)
  .append("g")
  .attr("transform", "translate(" + (props.width/2) + "," + (height/2) + ")");

  const outerRadius = props.width/2.2;
  const innerRadius = props.width/8;
  const arc = d3.svg.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

  const colors = ['#FD9827', '#DA3B21', '#3669C9', '#1D9524', '#971497'];
  
  const pie = d3.layout.pie()
    .value(d => d.count);

  const g = chart.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc")
    .on('mouseover', (d, i) => {
      d3.select(this)
        .transition()
        .duration(500)
        .ease('bounce')
        .attr('transform', (d) => {
          const dist = 10;
          d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
          const x = Math.sin(d.midAngle) * dist;
          const y = -Math.cos(d.midAngle) * dist;
          return 'translate(' + x + ',' + y + ')';
        });

      d3.select(this)
        .append("text")
        .style("fill", d => colors[i])
        .attr("id", "percent")
        .attr('transform', "translate(0,-5)")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .style("font", "bold 15px Arial")
        .text(d => (((d.value/sum)*100).toFixed(1) + " %"));

      g.filter(e => e.value != d.value)
        .style('opacity',0.5);
    }).on('mouseout', (d, i) => {
      d3.select(this)
        .transition()
        .duration(500)
        .ease('bounce')
        .attr('transform', 'translate(0,0)');
      
      d3.select("#percent").remove();
      g.filter(e => e.value !== d.value)
        .style('opacity', 1);
    });

  g.append("path")
    .style("fill", (d, i) => colors[i])
    .transition()
    .delay((d, i) => i * 400)
    .duration(500)
    .attrTween('d', d => {
      const i = d3.interpolate(d.startAngle, d.endAngle);
      return (t) => {
        d.endAngle = i(t);
        return arc(d);
      };
    });

  const center = g.filter(d => d.endAngle - d.startAngle > 0.1)
    .append("text")
    .style("fill", "white")
    .attr('transform', d => "translate(" + arc.centroid(d) + ")")
    .attr("text-anchor", "middle").attr("dy", ".35em")
    .text(d => d.value);

  const legend = chart.selectAll(".legend")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => "translate(150," + (-i * 20) + ")");

  const rect = legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", (d, i) => colors[i])
    .style('opacity', 0);

  const name = legend.append("text")
    .attr("x", 24)
    .attr("y", 12)
    .text(function (d) {
      let text = d.name;
      if (text.length > 30) {
        text = text.substring(0, 26);
        text += '...';
      }
      return text;
    }).style('opacity', 0);
  rect.transition()
    .delay((d, i) => i * 400)
    .duration(1000)
    .style('opacity', 1);
  name.transition()
    .delay((d, i) => i * 400)
    .duration(1000)
    .style('opacity', 1);
}

const PieChart = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    title: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
  },

  getDefaultProps: function() {
    return {
      width: 300,
      height: 350,
      title: '',
      Legend: true,
    };
  },
  componentDidMount: function() {
    var dom =  ReactDOM.findDOMNode(this);
    createChart(dom, this.props);
  },
  // shouldComponentUpdate: function() {
  //     var dom =  ReactDOM.findDOMNode(this);
  //     createChart(dom, this.props);
  //     return false;
  // },
  render: function() {
    return (
      <div>
        <h4> {this.props.title} </h4>
      </div>
    );
  },
});

export default PieChart;
