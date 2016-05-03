import React, { PropTypes, Component } from 'react';
import wiki from './services/wiki.js';
import $ from 'jquery';

const menuData = [
  { 
    mood: 'Happy',
    choice: 0,
    quote: 'The best way to find yourself is to lose yourself in the service of others.',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-3.jpg',
  },
  {
    mood: 'sad',
    choice: 1,
    quote: 'Do the best you can, and don\'t take life too serious.',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-2-610x343.jpg',
  },
  {
    mood: 'funny',
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
      currQuote: menuData[0].quote,
    };
  }

    onChoiceClick (event) {   
      event.preventDefault();
      console.log(event);
      var that = this;
      var data;
      console.log('event.target.value ', event.target.value);
      wiki("happy", function (res) {
        data = res.body;
        // console.log(data);
        console.log('this ', this);
        console.log('that', that);
        // console.log(that.state.currQuote);
        // this.state.currQuote = data[0];
        that.setState({
          currMood: "hello",
          currQuote: data[0],

        });

        return false;
      });
    }
    
    // onChoiceClick (choice) {
    //   wiki(menuData[choice.target.value].mood, (res) => {
    //     this.setState({
    //       currMood: choice,
    //       currChoice: menuData[choice.target.value],
    //       currQuote: res[0],
    //       currImg: menuData[choice.target.value].image
    //     });
    //   })
    // }

    onType (e) {
      const self = this;
      this.setState({
        currMood: e,
      });
      // console.log("eeeee", e)
      // console.log(this.state);
    }


    render() {
      return (
        <div>
          <h1>mood.ly</h1>
          <form>
            <input type="text" placeholder="How are you feeling?" defaultValue="Happy" onChange={this.onType.bind(this)}/> 
            <br />
            <input className="moodsubmit" type="submit" value="Submit!" onClick={this.onChoiceClick.bind(this)}/>
          </form>
          <div className="moodly-content">
            <span className="quote-title"><h2>{this.state.currQuote}</h2></span>
          </div>
        </div>
      );
    }
}
            // <Quote quoteList={this.state.quotes} onChange={this.onChoiceClick.bind(this)} />

export default App;