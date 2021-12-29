import { Component } from 'react';
import { contactService } from '../services/contactService';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setContact, getById } from '../store/actions/contactAction';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

class _ContactEditPage extends Component {
  state = {
    contact: null,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const contact = id
      ? await this.props.getById(id)
      : contactService.getEmptyContact();
    this.setState({ contact });
  }
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState(({ contact }) => ({
      contact: { ...contact, [field]: value },
    }));
  };

  onSaveContact = async (ev) => {
    ev.preventDefault();
    this.props.setContact({ ...this.state.contact });
    this.props.history.push('/contacts');
  };

  render() {
    const { contact } = this.state;
    console.log(contact);
    if (!contact) return '';
    return (
      <section className="contact-edit">
        <Link className="back" to={`/contacts/${contact._id}`}>
          <MdOutlineKeyboardBackspace />
        </Link>
        <form onSubmit={this.onSaveContact} className="edit-form flex">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Write contact name"
            value={contact.name}
            onChange={this.handleChange}
          />
          <label htmlFor="phone">phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Write contact phone"
            value={contact.phone}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Write contact email"
            value={contact.email}
            onChange={this.handleChange}
          />

          <button>Save</button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = {
  getById,
  setContact,
};

export const ContactEditPage = connect(
  null,
  mapDispatchToProps
)(_ContactEditPage);
