import LegendElement from './LegendElement';

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

export default D3Legend;
