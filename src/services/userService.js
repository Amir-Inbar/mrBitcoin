import moment from 'moment';
import { storageService } from './storageService';
// import moment from 'moment';

export const userService = {
  getUser,
  addMove,
  signout,
};

var user = {
  name: '',
  coins: 100,
  moves: [],
  img: 'contact-avatar-1.png',
};

function getUser(name) {
  let currUser = storageService.load('user');
  if (currUser) {
    user = currUser;
    return Promise.resolve(user);
  }
  if (name) {
    user.name = name;
    storageService.store('user', user);
    return Promise.resolve(user);
  }
  return;
}

function signout() {
  storageService.store('user', null);
  user = {
    name: '',
    coins: 100,
    moves: [],
    img: 'contact-avatar-1.png',
  };
}

function addMove(contact, amount) {
  const move = {
    toId: contact._id,
    to: contact.name,
    at: moment().format('MMMM Do YYYY, h:mm:ss a'),
    amount,
  };
  user.moves.unshift(move);
  user.coins -= amount;
  storageService.store('user', user);
  return Promise.resolve(user);
}
