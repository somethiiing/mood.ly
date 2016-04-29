class App extends React.Component {
  constructor(props) {
    super(props);

    //searchData -- are we going to have search or dropdown?
      // this.debouncedSearch = _.debouce(searchData, 500, { leading: true }
      // );

    //set default state
    this.state = {
      currChoice: menuData[0].choice,
    };
  }

    onChoiceClick (choice) {
      this.state.currChoice.choice = choice;
      this.setState({
        currChoice: choice
      });
    }

    render() {
      return (
        <div>
          <div className="dropdown-menu">
            <select onChange={(e) => onChoiceClick(e.target.value)}>
              <option value="1">Happy</option>
              <option value="2">Sentimental</option>
              <option value="3">Romantic</option>
            </select>
          </div>
          <div className="moodly-content">
            <h1>Hello World!</h1>
          </div>
        </div>
      );
    }
}

window.menuData = [
  {
    title: 'Unicorn',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-3.jpg',
    choice: 0
  },
  {
    title: 'Ship',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-2-610x343.jpg',
    choice: 0
  },
  {
    title: 'Sunset',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-7.jpg',
    choice: 0
  },
  {
    title: 'Kitten',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/best-wallpapers-13.jpg',
    choice: 0
  },
  {
    title: 'Darkness',
    image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/Best-Wallpapers-29.jpg',
    choice: 0
  }
];

ReactDOM.render(<App />, document.getElementById('app'));