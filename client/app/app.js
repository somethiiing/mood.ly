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

ReactDOM.render(<App />, document.getElementById('app'));