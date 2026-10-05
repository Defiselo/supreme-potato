/* eslint-disable jsx-a11y/control-has-associated-label */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditContactForm from './editContactForm';
import Notification from './notification';
import { useUrl } from './UrlProvider';

const ContactList = () => {
  const { firmId } = useParams();
  const navigate = useNavigate();
  const { apiUrl } = useUrl();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!firmId) return;
      
      const response = await axios.get(`${apiUrl}contacts/${firmId}`);
      // Ošetříme, zda server nevrátil chybovou hlášku v objektu
      if (response.data && response.data.msg && !Array.isArray(response.data)) {
        setError(response.data.msg);
      } else {
        // Pokud je to pole nebo objekt s daty, vezmeme je
        setContacts(Array.isArray(response.data) ? response.data : (response.data.contacts || response.data.data || []));
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${apiUrl}contacts/${firmId}`);
        
        // Zde bezpečně ošetříme, co server vrací
        if (Array.isArray(response.data)) {
          setContacts(response.data);
          if (response.data.length === 0) {
            // Můžeš nastavit hlášku nebo nechat prázdné pole
          }
        } else if (response.data && response.data.msg) {
          setError(response.data.msg);
        } else {
          setContacts([]);
        }
      } catch (err) {
        setError(err.message || 'Chyba při načítání kontaktů');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [apiUrl, firmId]); // <-- Opraveno: Odstraněn selectedContact, který mohl způsobit zacyklení

  const deleteContact = async (contactId) => {
    try {
      const response = await axios.delete(`${apiUrl}contacts/${contactId}`);
      if (response.status === 200) {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
      } else {
        setError('Smazání kontaktu selhalo');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClose = () => {
    setSelectedContact(null);
  };

  const handledelClick = (contact) => {
    const confirmed = window.confirm('Chceš to fakt vymazat?');
    if (confirmed) {
      deleteContact(contact.id);
    }
  };

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleSave = (updatedContact) => {
    // Zjištění, zda šlo o úpravu existujícího nebo přidání nového
    const exists = contacts.some((c) => c.id === updatedContact.id);
    if (exists) {
      setContacts(contacts.map(
        (contact) => (contact.id === updatedContact.id ? updatedContact : contact),
      ));
    } else {
      setContacts([...contacts, updatedContact]);
    }
    setSelectedContact(null);
  };

  const handleCopy = (inputValue) => {
    navigator.clipboard.writeText(inputValue).then(() => {
      setMsg('Zkopírováno!');
    }).catch((err) => {
      setError('Chyba při kopírování: ' + err);
    });
  };

  const Clipboard = (formData) => {
    const formattedString = formData.filter((item) => item).join(', ');
    handleCopy(formattedString);
  };

  if (loading) {
    return <p className="no-data">Načítám...</p>;
  }

  return (
    <div className="page-container">
      {msg && (<Notification message={msg} type="edit-firm-success" />)}
      {error && (<Notification message={error} type="edit-firm-error" />)}
      
      {selectedContact ? (
        <EditContactForm
          contact={selectedContact}
          onSave={handleSave}
          onClose={handleClose}
          firmName=""
        />
      ) : (
        <>
          <table className="responsive-table">
            <caption><h3>Kontakty</h3></caption>
            <thead>
              <tr>
                <th>Hlavní</th>
                <th>Aktivní</th>
                <th>Foto</th>
                <th>Jméno</th>
                <th>E-mail</th>
                <th>Telefon</th>
                <th>LinkedIN</th>
                <th>Možnosti</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td data-label="Hlavní">{contact.main === '1' ? '\u2705' : '\u2610'}</td>
                  <td data-label="Aktivní">{contact.active_c === '1' ? '\u2705' : '\u2610'}</td>
                  <td data-label="Foto"><img src={contact.img} alt="" className="kontakt-img" /></td>
                  <td data-label="Jméno">{contact.surname}</td>
                  <td data-label="E-mail"><a href={`${contact.mailto ? contact.mailto.replace(/\+/g, ' ') : '#'}`}>{contact.email}</a></td>
                  <td data-label="Telefon"><a href={`tel:${contact.phone}`}>{contact.phone}</a></td>
                  <td data-label="LinkedIN">{ contact.linkedin ? (<a href={`${contact.linkedin}`}>LinkedIN</a>) : '\u00A0'}</td>
                  <td>
                    <button type="button" onClick={() => handleEditClick(contact)}>upravit</button>
                    <button type="button" onClick={() => handledelClick(contact)} className="del-btn">smazat</button>
                    <button type="button" onClick={() => Clipboard([contact.surname, contact.email, contact.phone, contact.linkedin])} className="fn-btn">Kontakt do schránky</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                <button 
                    type="button" 
                    style={{float: 'left'}}
                    onClick={() => handleEditClick({ 
                      id: null, 
                      firm_id: firmId, 
                      main: !contacts.filter((contact) => contact.main === '1').length 
                    })}
                  >
                    Přidat kontakt
                  </button>
                </td>
                <td colSpan="6" />
                <td>
                  
                  <button style={{float: 'right'}} type="button" className="fn-btn" onClick={() => navigate('/firm')}>
                      ← Zpět na firmy
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export class ContactListErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() {
    if (this.state.hasError) return <p className="no-data">Něco se pokazilo v komponentě kontaktů.</p>;
    return this.props.children;
  }
}

export default ContactList;