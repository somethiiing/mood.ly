import React from 'react';

class D3Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
      >
        {this.props.children}
      </svg>
    );
  }
}

D3Chart.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  children: React.PropTypes.node,
};

export default D3Chart;
