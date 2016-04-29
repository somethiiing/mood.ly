//quoteTableItem.js
class QuoteItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div onChange={() => this.props.onChoiceClick(this.props.quote)}>
        <span className="quote"><h3>{console.log(this.props.quote)}<br /></h3></span>
      </div>
    )
  }
};

//export
window.QuoteItem = QuoteItem;