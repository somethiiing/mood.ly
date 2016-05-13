import React from 'react';
import UserController from '../../services/controllers';

class Liked extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userQuotes: '',
      userGifs: null,
    };
  }

  render() {
    this.getAllUserGiphys();
    return (
      <div className="container-data">
        <h1>My Data</h1>
        {this.props.gifList.map(gif => 
          <img src={gif.url} alt/>
        )}
      </div>
    );
  }
}

Liked.propTypes = {
  liked: React.PropTypes.object,
  user: React.PropTypes.object,
};

// EXPORT
export default Liked;
