import React from "react";
import dp from "../images/dp.png";
import { useParams } from "react-router-dom";


const ContactDetail = ({ contacts }) => {
  const { id } = useParams();  // Here i used param bcoz it was not fetching the id properly from the contacts

  // Find the contact with the specified id
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const { name, email } = contact;

  return (
    <div className="main">
      <div className="image">
        <img
          src={dp}
          alt="user"
          style={{ height: "500px", width: "500px", marginTop: "50px" }}
        />
      </div>
      <div className="content" style={{ fontSize: "30px", textAlign: "center" }}>
        <div className="header" style={{ marginBottom: "8px" }}>
          {name}
        </div>
        <div className="description">{email}</div>
      </div>
      <div className="center-div">
        <button className="ui button blue center">
          Back to Contact List
        </button>
      </div>
    </div>
  );
};

export default ContactDetail;
