import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from 'uuid'; // Correct import for uuid
import './App.css';
import api from "../api/contacts";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  // Retrieve contacts from the API
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request); // await added here
    setContacts([...contacts, response.data]);
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  useEffect(() => {
    const retrieveContactsFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveContactsFromLocalStorage) {
      setContacts(retrieveContactsFromLocalStorage);
    }

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };  

    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} />
          <Route exact path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route exact path="/contact/:id" element={<ContactDetail contacts={contacts} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
