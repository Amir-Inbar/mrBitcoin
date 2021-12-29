import { Router } from 'react-router-dom';

function ContactPreview({ contact }) {
  return (
    <section className="contact-preview flex ">
      <img src={`assets/img/${contact.img}`} alt="" />
      <div className="contact-details">
        <h3>{contact.name}</h3>
        <div>{contact.phone}</div>
        <div>{contact.email}</div>
      </div>
    </section>
  );
}

export default ContactPreview;
