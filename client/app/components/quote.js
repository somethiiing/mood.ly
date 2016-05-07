import React from 'react';

export default (props) =>
  <div className="container-data">
    {props.quoteList.map((quote, i) => 
      <QuoteItem quote={quote} key={i} onQuoteClick={props.onQuoteClick} />
    )}
  </div>;
