import { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../store/actions/userAction';

class _SignupPage extends Component {
  state = {
    user: null,
  };

  handleChange = ({ target }) => {
    const user = !isNaN(target.value) ? +target.value : target.value;
    this.setState({ user });
  };

  saveUser = () => {
    this.props.getUser(this.state.user);
    this.props.history.push('/');
  };
  render() {
    return (
      <section className="signup-container">
        <div className="signup-modal">
          <h1>Hey!, Please sign up below</h1>
          <input
            onChange={this.handleChange}
            type="text"
            name="user"
            id="user"
            placeholder="Write Your Name"
          />
          <button onClick={this.saveUser}>Sign In</button>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  getUser,
};

export const SignupPage = connect(null, mapDispatchToProps)(_SignupPage);
