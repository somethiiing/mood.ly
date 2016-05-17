import React from 'react';
import Sector from './Sector';

class DataSeries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const color = this.props.colors;
    const data = this.props.data;
    const width = this.props.width;
    const height = this.props.height;
    const pie = d3.layout.pie();
    const result = data.map(item => item.count);
    const names = data.map(item => item.name);
    const sum = result.reduce((memo, num) => memo + num, 0);
    const position = "translate(" + (width)/2 + "," + (height)/2 + ")";
    const bars = (pie(result)).map((point, i) => (
      <Sector
        data={point}
        ikey={i}
        key={i}
        name={names[i]}
        colors={color}
        total={sum}
        width={width}
        height={height}
      />
    ));

    return (
      <g transform={position}>{bars}</g>
    );
  }
}

DataSeries.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  color: React.PropTypes.array,
  data: React.PropTypes.array.isRequired,
};

export default DataSeries;
