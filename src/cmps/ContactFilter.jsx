import { Component } from 'react';
import { Link } from 'react-router-dom';

export class ContactFilter extends Component {
  state = {
    term: '',
  };

  handleChange = ({ target }) => {
    const value = !isNaN(target.value) ? +target.value : target.value;

    this.setState({ term: value }, () => {
      console.log(value);
      this.props.onChangeFilter(this.state);
    });
  };
  render() {
    return (
      <section className="filter-main flex align-center">
        <h1>Search for contact member</h1>
        <input
          onChange={this.handleChange}
          type="text"
          name="contact"
          id="contact"
          placeholder="Write name or phone number"
        />
        <Link to={'/contacts/edit/'}>Add Contact</Link>
      </section>
    );
  }
}
