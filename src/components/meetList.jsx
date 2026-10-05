/* eslint-disable jsx-a11y/control-has-associated-label */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditMeetForm from './editMeetForm';
import { useUrl } from './UrlProvider';
import { convertDateTimeToCzech } from '../utils/czechdates';

const MeetList = () => {
  const { firmId } = useParams();
  const navigate = useNavigate();
  const { apiUrl } = useUrl();

  const [meets, setMeets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeet, setSelectedMeet] = useState(null);
  const [firmName, setFirmName] = useState('');

  useEffect(() => {
    const fetchMeets = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}meets/${firmId}`);
        if (Array.isArray(response.data) && response.data.length === 0
        && response.data.msg !== undefined) {
          setError('Žádné schůzky.');
        } else {
          setMeets(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (firmId) {
      fetchMeets();
    }
  }, [apiUrl, firmId]);

  const deleteMeet = async (meetId) => {
    try {
      const response = await axios.delete(`${apiUrl}meets/${meetId}`);
      if (response.status === 200) {
        setMeets((prevMeets) => prevMeets.filter((meet) => meet.id !== meetId));
      } else {
        setError('Smazání schůzky selhalo');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handledelClick = (meet) => {
    const confirmed = window.confirm('Chceš to fakt vymazat?');
    if (confirmed) {
      deleteMeet(meet.id);
    }
  };

  const handleEditClick = (meet) => {
    setSelectedMeet(meet);
  };

  const handleClose = () => {
    setSelectedMeet(null);
  };

  const handleSave = (meetupdatedMeet) => {
    const existingMeet = meets.find((meet) => meet.id === meetupdatedMeet.id);
    if (!existingMeet) {
      setMeets([...meets, meetupdatedMeet]);
    } else {
      setMeets(meets.map(
        (meet) => (meet.id === meetupdatedMeet.id ? meetupdatedMeet : meet),
      ));
    }
    setSelectedMeet(null);
  };

  if (loading) {
    return <p className="no-data">Načítám...</p>;
  }
  if (error) {
    return (
      <p className="no-data">
        Chyba:
        {error}
      </p>
    );
  }

  return (
    <div className="page-container">
      {selectedMeet ? (
        <EditMeetForm
          meet={selectedMeet}
          onSave={handleSave}
          onClose={handleClose}
          firmName={firmName}
        />
      ) : (
        <table className="responsive-table">
          <caption><h3>Schůzky</h3></caption>
          <thead>
            <tr>
              <th>Datum a čas</th>
              <th>Poznámka</th>
              <th>Možnosti</th>

            </tr>
          </thead>
          <tbody>
            {meets.map((meet) => (
              <tr key={meet.id}>
                <td data-label="Datum a čas">{convertDateTimeToCzech(meet.date_time)}</td>
                <td data-label="Poznámka">{meet.notes}</td>
                <td><button type="button" onClick={() => handleEditClick(meet)}>upravit</button>
                <button type="button" onClick={() => handledelClick(meet)} className="del-btn">smazat</button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
              <button style={{float: 'left'}} type="button" onClick={() => handleEditClick({ firm_id: firmId })}>Přidat schůzku</button>
              </td>
              <td colSpan="1" />
              <td>
              <button style={{float: 'right'}} type="button" className="fn-btn" onClick={() => navigate('/firm')}>
                      ← Zpět na firmy
              </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MeetList;