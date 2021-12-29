import { Component } from 'react';
import { ContactFilter } from './ContactFilter';
import ContactPreview from './ContactPreview';
import { Link } from 'react-router-dom';

export function ContactList({ contacts, onChangeFilter }) {
  // const  = this.props;
  if (!contacts) return <div>Loading...</div>;
  return (
    <section className="contacts-list-container">
      <ContactFilter onChangeFilter={onChangeFilter} />
      <ul className="contacts-list flex">
        {contacts.map((contact) => {
          return (
            <li key={contact._id}>
              <Link to={`/contacts/${contact._id}`}>
                <ContactPreview contact={contact} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
