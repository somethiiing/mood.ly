class App extends React.Component {
  constructor(props) {
    super(props);

    //searchData -- are we going to have search or dropdown?
      // this.debouncedSearch = _.debouce(searchData, 500, { leading: true }
      // );

    //set default state
    this.state = {
      currMood: menuData[0].mood,
      currChoice: menuData[0].choice,
      currQuote: menuData[0].quote,
      quotes: props.menuData,
    };
  }

    onChoiceClick (mood, choice, quote) {
      this.state.currMood = mood;
      this.state.currChoice = choice;
      this.state.currQuote = quote;
      this.setState({
        currMood: mood.target.value,
        currChoice: choice.target.value,
        currQuote: quote.target.value
      });
    }

    render() {
      return (
        <div>
          <div className="dropdown-menu">
            <select value={this.state.currChoice} onChange={this.onChoiceClick.bind(this)}>
              <option value="1">Happy</option>
              <option value="2">Sentimental</option>
              <option value="3">Romantic</option>
            </select>
          </div>
          <div className="moodly-content">
            <h1>Hello World!</h1>
            <span className="quote-title"><h2>Quotes</h2></span>
            <QuoteTable quoteList={this.state.quotes} onChoiceClick={this.onChoiceClick.bind(this)} />
          </div>
        </div>
      );
    }
}

window.menuData = [
  { 
    mood: 'Happy',
    quote: 'Unicorn',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-3.jpg',
    choice: 1
  },
  {
    mood: 'Sentimental',
    quote: 'Ship',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-2-610x343.jpg',
    choice: 2
  },
  {
    mood: 'Romantic',
    quote: 'Sunset',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-7.jpg',
    choice: 3
  },
];

ReactDOM.render(<App menuData={menuData} />, document.getElementById('app'));