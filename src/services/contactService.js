import {storageService} from './storageService';
import { v4 as uuid } from 'uuid';

export const contactService = {
  getContacts,
  getContactById,
  deleteContact,
  saveContact,
  getEmptyContact,
  resetContacts
};

const contacts = [  {
  _id: "5a56640269f443a5d64b32ca",
  img: 'contact-avatar-1.png',
  name: "Ochoa Hyde",
  email: "ochoahyde@renovize.com",
 phone: "+1 (968) 593-3824",
  coins:200
},
{
  _id: "5a5664025f6ae9aa24a99fde",
  img: 'contact-avatar-2.png',
  name: "Hallie Mclean",
  email: "halliemclean@renovize.com",
 phone: "+1 (948) 464-2888",
  coins:200
},
{
  _id: "5a56640252d6acddd183d319",
  img: 'contact-avatar-3.png',
  name: "Parsons Norris",
  email: "parsonsnorris@renovize.com",
 phone: "+1 (958) 502-3495",
  coins:200
},
{
  _id: "5a566402ed1cf349f0b47b4d",
  img: 'contact-avatar-4.png',
  name: "Rachel Lowe",
  email: "rachellowe@renovize.com",
 phone: "+1 (911) 475-2312",
  coins:200
},
{
  _id: "5a566402abce24c6bfe4699d",
  img: 'contact-avatar-5.png',
  name: "Dominique Soto",
  email: "dominiquesoto@renovize.com",
 phone: "+1 (807) 551-3258",
  coins:200
},
{
  _id: "5a566402a6499c1d4da9220a",
  img: 'contact-avatar-6.png',
  name: "Shana Pope",
  email: "shanapope@renovize.com",
 phone: "+1 (970) 527-3082",
  coins:200
},
{
  _id: "5a566402f90ae30e97f990db",
  img: 'contact-avatar-7.png',
  name: "Faulkner Flores",
  email: "faulknerflores@renovize.com",
 phone: "+1 (952) 501-2678",
  coins:200
},
{
  _id: "5a5664027bae84ef280ffbdf",
  img: 'contact-avatar-8.png',
  name: "Holder Bean",
  email: "holderbean@renovize.com",
 phone: "+1 (989) 503-2663",
  coins:200
},
{
  _id: "5a566402e3b846c5f6aec652",
  img: 'contact-avatar-9.png',
  name: "Rosanne Shelton",
  email: "rosanneshelton@renovize.com",
 phone: "+1 (968) 454-3851",
  coins:200
},
{
  _id: "5a56640272c7dcdf59c3d411",
  img: 'contact-avatar-4.png',
  name: "Pamela Nolan",
  email: "pamelanolan@renovize.com",
 phone: "+1 (986) 545-2166",
  coins:200
},
{
  _id: "5a5664029a8dd82a6178b15f",
  img: 'contact-avatar-7.png',
  name: "Roy Cantu",
  email: "roycantu@renovize.com",
 phone: "+1 (929) 571-2295",
  coins:200
},
{
  _id: "5a5664028c096d08eeb13a8a",
  img: 'contact-avatar-1.png',
  name: "Ollie Christian",
  email: "olliechristian@renovize.com",
 phone: "+1 (977) 419-3550",
  coins:200
},
{
  _id: "5a5664026c53582bb9ebe9d1",
  img: 'contact-avatar-9.png',
  name: "Nguyen Walls",
  email: "nguyenwalls@renovize.com",
 phone: "+1 (963) 471-3181",
  coins:200
},
{
  _id: "5a56640298ab77236845b82b",
  img: 'contact-avatar-7.png',
  name: "Glenna Santana",
  email: "glennasantana@renovize.com",
 phone: "+1 (860) 467-2376",
  coins:200
},
{
  _id: "5a56640208fba3e8ecb97305",
  img: 'contact-avatar-4.png',
  name: "Malone Clark",
  email: "maloneclark@renovize.com",
 phone: "+1 (818) 565-2557",
  coins:200
},
{
  _id: "5a566402abb3146207bc4ec5",
  img: 'contact-avatar-8.png',
  name: "Floyd Rutledge",
  email: "floydrutledge@renovize.com",
 phone: "+1 (807) 597-3629",
  coins:200
},
{
  _id: "5a56640298500fead8cb1ee5",
  img: 'contact-avatar-1.png',
  name: "Grace James",
  email: "gracejames@renovize.com",
 phone: "+1 (959) 525-2529",
  coins:200
},
{
  _id: "5a56640243427b8f8445231e",
  img: 'contact-avatar-2.png',
  name: "Tanner Gates",
  email: "tannergates@renovize.com",
 phone: "+1 (978) 591-2291",
  coins:200
},
{
  _id: "5a5664025c3abdad6f5e098c",
  img: 'contact-avatar-5.png',
  name: "Lilly Conner",
  email: "lillyconner@renovize.com",
 phone: "+1 (842) 587-3812",
  coins:200
}]

function getContacts(filterBy = null) {
  return new Promise((resolve, reject) => {
    let contactsToReturn = storageService.load('contacts');
    if (!contactsToReturn) {
      contactsToReturn = contacts;
      storageService.store('contacts', contactsToReturn);
    }
    if (filterBy && filterBy.term) {
      contactsToReturn = filter(filterBy.term);
      console.log(contactsToReturn);
    }
    resolve(sort(contactsToReturn));
  });
}

function getContactById(id) {
  return new Promise((resolve, reject) => {
    let contacts = storageService.load('contacts');
    const contact = contacts.find((contact) => contact._id === id);
    contact ? resolve(contact) : reject(`Contact id ${id} not found!`);
  });
}

function deleteContact(id) {
  return new Promise((resolve, reject) => {
    let contacts = storageService.load('contacts');
    const index = contacts.findIndex((contact) => contact._id === id);
    if (index !== -1) contacts.splice(index, 1);
    storageService.store('contacts', contacts);
    resolve(contacts);
  });
}

function saveContact(contact) {
  return contact._id ? _updateContact(contact) : _addContact(contact);
}

function resetContacts() {
  storageService.store('contacts', contacts);
  return contacts;
}

function _updateContact(contact) {
  return new Promise((resolve, reject) => {
    let contacts = storageService.load('contacts');
    const index = contacts.findIndex((c) => contact._id === c._id);
    if (index !== -1) contacts[index] = contact;
    storageService.store('contacts', contacts);
    resolve(contact);
  });
}

function _addContact(contact) {
  return new Promise((resolve, reject) => {
    contact._id = uuid();
    contacts.push(contact);
    storageService.store('contacts', contacts);
    resolve(contact);
  });
}


function getEmptyContact() {
  return {
    name: '',
    email: '',
    phone: '',
    img: 'contact-avatar-1.png',
    coins:100
  };
}

function filter(term) {
  term = term.toLocaleLowerCase();
  return contacts.filter((contact) => {
    return (
      contact.name.toLocaleLowerCase().includes(term) ||
      contact.phone.toLocaleLowerCase().includes(term) ||
      contact.email.toLocaleLowerCase().includes(term)
    );
  });
}

function sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }
    return 0;
  });
}
