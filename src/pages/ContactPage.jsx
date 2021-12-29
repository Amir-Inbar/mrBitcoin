import { Component } from 'react';
import { ContactList } from '../cmps/ContactList';
import { connect } from 'react-redux';
import { contactService } from '../services/contactService';
import { loadContacts, setFilterBy } from '../store/actions/contactAction';
class _ContactPage extends Component {
  state = {
    contacts: null,
    filterBy: null,
  };

  componentDidMount() {
    this.props.loadContacts();
  }

  onChangeFilter = (filterBy) => {
    this.props.setFilterBy(filterBy);
    this.props.loadContacts();
  };

  loadContacts = async () => {
    const { filterBy } = this.state;
    const contacts = await contactService.getContacts(filterBy);
    console.log(contacts);
    this.setState({ contacts });
  };

  render() {
    const { contacts } = this.props;
    if (!contacts) return <div>Loading...</div>;
    return (
      <section>
        <ContactList contacts={contacts} onChangeFilter={this.onChangeFilter} />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactModule.contacts,
  };
};

const mapDispatchToProps = {
  loadContacts,
  setFilterBy,
};

export const ContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactPage);
