import React from 'react';
import UserController from '../../services/services';

class Liked extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currQuotes: '',
    };

    this.getAllUserGiphys = this.getAllUserGiphys.bind(this);
  }

  getAllUserGiphys() {
    const self = this;
    const username = this.props.user.username;
    UserController.getAllUserGiphys(username, (res) => {
      console.log(res);
      console.log(res.body);
      // self.setState({
      //   currQuotes: res.body,
      // });
    });
  }

  render() {
    return (
      <div className="container-data">
      {this.getAllUserGiphys()}
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
