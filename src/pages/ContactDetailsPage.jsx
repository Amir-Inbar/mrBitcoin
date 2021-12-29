import { Component } from 'react';
import { contactService } from '../services/contactService';
import { Link } from 'react-router-dom';
import { TransferFunds } from '../cmps/TransferFunds';
import { addMove, getUser } from '../store/actions/userAction';
import { connect } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import MovesList from '../cmps/MovesList';
import { userService } from '../services/userService';

class _ContactDetailsPage extends Component {
  state = {
    contact: null,
    user: null,
  };

  componentDidMount() {
    this.getContact();
    this.getUser();
  }

  onTransferCoins = (contact, amount) => {
    this.props.addMove(contact, amount);
    this.props.history.push('/');
  };

  getContact = async () => {
    const id = this.props.match.params.id;
    const contact = await contactService.getContactById(id);
    this.setState({ contact });
  };

  getUser = async () => {
    const user = await userService.getUser();
    this.setState({ user });
  };
  render() {
    const { contact, user } = this.state;
    if (!contact) return <div>Loading...</div>;
    if (!user) return <div>Loading...</div>;
    const moves = user.moves.filter((move) => move.to === contact.name);
    return (
      <section className="contact-details-page flex align-center">
        <Link className="edit" to={`/contacts/edit/${contact._id}`}>
          <AiOutlineEdit />
        </Link>
        <Link className="back" to={'/contacts'}>
          <MdOutlineKeyboardBackspace />
        </Link>

        <img src={`assets/img/${contact.img}`} alt="" />
        <div className="contact-details-preview flex justify-center">
          <h1>{contact.name}</h1>
          <div>{contact.email}</div>
          <div>{contact.phone}</div>
          <TransferFunds
            contact={contact}
            onTransferCoins={this.onTransferCoins}
          />
        </div>
        {!moves.length || <MovesList moves={moves} />}
      </section>
    );
  }
}

const mapDispatchToProps = {
  addMove,
  getUser,
};

export const ContactDetailsPage = connect(
  null,
  mapDispatchToProps
)(_ContactDetailsPage);
