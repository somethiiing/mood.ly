import React from 'react';
import D3Chart from './D3Chart';

var D3Legend = React.createClass({

  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    colors: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired,
  },

  render: function() {
    var color = this.props.colors;
    var data = this.props.data;
    var elements = data.map(function(item, i){
      return (
        <LegendElement color={color} xpos="0" ypos={100+i*20} data={item.name} key={i} ikey={i}/>
      )
    })

    return(
        <svg className="legend" width={this.props.width} height={this.props.height}>{elements}</svg>
    );
  }
});

var LegendElement = React.createClass({
  render: function() {
    var position =  "translate(" + this.props.xpos + "," + this.props.ypos + ")";
    return (
      <g transform={position}>
        <rect width="18" height="18" fill={this.props.color[this.props.ikey]}></rect>
        <text x="24" y="9" dy=".35em">{this.props.data}</text>
      </g>
    );
  }
});

var Sector = React.createClass({
  getInitialState: function() {
    return {text: '', opacity:'arc'};
  },
  render: function() {
    var outerRadius = this.props.width/2.2;
    var innerRadius = this.props.width/8;
    var arc = d3.svg.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);
    var data = this.props.data;
    var center = "translate(" + arc.centroid(data) + ")";
    var percentCenter = "translate(0,3)";
    var color = this.props.colors;
    return (
      <g onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.onClick}>
        <path className={this.state.opacity} fill={color[this.props.ikey]} d={arc(this.props.data)}></path>
        <text fill="white" transform={center} textAnchor="middle" fontSize="15px">{this.props.name}</text>
        <text fill={color[this.props.ikey]} stroke={color} fontSize="15px" transform={percentCenter} textAnchor="middle">{this.state.text}</text>
      </g>
    );
  },

  onMouseOver: function() {
    this.setState({text: '', opacity:'arc-hover'});
    var percent = (this.props.data.value/this.props.total)*100;
    percent = percent.toFixed(1);
    this.setState({text: percent + " %"});
  },
  onMouseOut: function() {
    this.setState({text: '', opacity:'arc'});
  },
});

var DataSeries = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    color: React.PropTypes.array,
    data: React.PropTypes.array.isRequired,
  },
  render: function() {
    var color = this.props.colors;
    var data = this.props.data;
    var width = this.props.width;
    var height = this.props.height;
    var pie = d3.layout.pie();
    var result = data.map(function(item){
      return item.count;
    })
    var names = data.map(function(item){
      return item.name;
    })
    var sum = result.reduce(function(memo, num){ return memo + num; }, 0);
    var position = "translate(" + (width)/2 + "," + (height)/2 + ")";
    var bars = (pie(result)).map(function(point, i) {
      return (
        <Sector data={point} ikey={i} key={i} name={names[i]} colors={color} total=  
        {sum} width={width} height={height}/>
      )
    });

    return (
        <g transform={position}>{bars}</g>
    );
  }
});



var D3PieChart = React.createClass({
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

  render: function() {
    var colors = [
      '#BFEFFF', '#B2C3FF', '#A2C4E8', '#A2E8E7', '#B2FFE8',
      '#C2A5FF', '#9A96E8', '#96BEE8', '#A5E8FF', '#A29FF5',
      '#A5B9FF', '#9FF5F4', '#9FC9F5', '#A5E9FF', '#A5FFE4',
      '#9FF5C3', '#96E8E7', '#96E8B9', '#A5FFB1', '#98B0FF',
      '#8BB9E8', '#8BE8E6', '#98FFE0',
    ];
    // var colors = d3.scale.category20c().range();
    return (
      <div>
        <h4> {this.props.title} </h4>
        <D3Chart width={this.props.width} height={this.props.height}>
              <DataSeries data={this.props.data} colors={colors} width=
                {this.props.width} height={this.props.height}/>
        </D3Chart>
      </div>
    );
  },
});

/*
// TEXT OUTSIDE ARC
arc.append("svg:text")
   .attr("transform", function(d) {
    var c = arc.centroid(d),
    x = c[0],
    y = c[1],
    h = Math.sqrt(x*x + y*y);
    return "translate(" + (x/h * labelr) + ',' + (y/h * labelr) + ")";
   })
   .attr("dy", "0.35em")
   .attr("text-anchor", function(d) {
    return (d.endAngle + d.startAngle)/2 > Math.PI ? "end" : "start";
   })
   .text(function() {
    return this.props.name;
   });
*/

export default D3PieChart;
