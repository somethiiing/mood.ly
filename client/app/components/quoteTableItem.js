//quoteTableItem.js
class QuoteTableItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span className="quote"><h3>The quote is: </h3>{this.props.quote}</span>
      </div>
    )
  }
};

//export
window.QuoteTableItem = QuoteTableItem;