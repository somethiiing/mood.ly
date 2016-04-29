//quoteTable.js
const QuoteTable = (props) => {
  return (
    <div className="container-data">
      {props.quoteList.map((quote, i) => 
        <quoteTableItem quote={quote} key={i} onChoiceClick={props.onChoiceClick} />
      )}
    </div>
  ) 
};

//export
window.QuoteTable = QuoteTable;