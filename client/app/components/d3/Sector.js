import React from 'react';

class Sector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      opacity: 'arc',
    };
  }

  render() {
    const outerRadius = this.props.width / 2.2;
    const innerRadius = this.props.width / 8;
    const arc = d3.svg.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);
    const data = this.props.data;
    const center = "translate(" + arc.centroid(data) + ")";
    const percentCenter = "translate(0,3)";
    const color = this.props.colors;
    return (
      <g
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onClick={this.onClick}
      >
        <path
          className={this.state.opacity}
          fill={color[this.props.ikey]}
          d={arc(this.props.data)}
        ></path>
        <text
          fill="white"
          transform={center}
          textAnchor="middle"
          fontSize="15px"
        >{data.value}</text>
        <text
          fill={color[this.props.ikey]}
          stroke={color}
          fontSize="15px"
          transform={percentCenter}
          textAnchor="middle"
        >{this.state.text}</text>
      </g>
    );
  }
}

Sector.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  colors: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
};

export default Sector;
