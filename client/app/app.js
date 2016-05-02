import React, { PropTypes, Component } from 'react';
import wiki from './services/wiki.js';

const menuData = [
  { 
    mood: 'Happy',
    choice: 0,
    quote: 'The best way to find yourself is to lose yourself in the service of others.',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-3.jpg',
  },
  {
    mood: 'Sentimental',
    choice: 1,
    quote: 'Do the best you can, and don\'t take life too serious.',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-2-610x343.jpg',
  },
  {
    mood: 'Romantic',
    choice: 2,
    quote: 'It\'s a funny thing about life; if you refuse to accept anything but the best, you very often get it.',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-7.jpg',
  },
];

class App extends Component {
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
      value: 0
    };
  }

    onChoiceClick (choice) {
      console.log('choice.target.value ', choice.target.value);
      wiki.wikiQuoteCall(menuData[choice.target.value].mood, function (res) {console.log(res)});
      this.setState({
        currMood: menuData[choice.target.value].mood,
        currChoice: menuData[choice.target.value],
        currQuote: menuData[choice.target.value].quote,
        currImg: menuData[choice.target.value].image
      });
    }

    render() {
      return (
        <div>
          <h1>mood.ly</h1>
          <div className="form-group">
            <select className="form-control" value={this.state.value} onChange={this.onChoiceClick.bind(this)}>
              <option value="0">Happy</option>
              <option value="1">Sentimental</option>
              <option value="2">Romantic</option>
            </select>
            <button value={this.state.value} onClick={console.log('hi')}>BUTTON PLEASE WORK</button>
          </div>
          <div className="moodly-content">
            <span className="quote-title"><h2>{this.state.currQuote}</h2></span>
          </div>
        </div>
      );
    }
}
            // <Quote quoteList={this.state.quotes} onChange={this.onChoiceClick.bind(this)} />

export default App;