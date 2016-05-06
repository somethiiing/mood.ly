export default (props) =>
  return (
    <div className="container-data">
      {props.quoteList.map((quote, i) => 
        <QuoteItem quote={quote} key={i} onChoiceClick={props.onChoiceClick} />
      )}
    </div>
  );