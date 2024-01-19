import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "../../global.css"
import UserContext from '../Context/UserContext';
import { CreateEvent } from '../CreateEvent';

function Events() {
  const [events, setEvents] = useState([]);
  const { user } = useContext(UserContext)

  useEffect(() => {
    fetchEvents()
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:3001/events')
      .then((response) => {
        // sortera efter datum, kraftigt influencerat av stack overflow och chatgpt
        const sortedEvents = response.data.sort((a, b) => {
          return new Date(a.event_date) - new Date(b.event_date)
        })
        setEvents(sortedEvents);
      })
      .catch((error) => {
        console.error('Error fetching events', error);
      });
  }

  const showAttendees = (event) => {
    alert(`Showing attendees for event: ${event.event_attendees}`);
  };

  const joinEvent = (event) => {
    const url = `http://localhost:3001/events`;
    axios.get(url)
      .then(response => {
        const eventToUpdate = response.data.find(e => e.id === event.id);

        if (!eventToUpdate) {
          console.error('Event hittades inte');
          return;
        }
        if (!eventToUpdate.event_attendees.includes(user.username)) {
          eventToUpdate.event_attendees.push(user.username);
          const updateUrl = `http://localhost:3001/events/${event.id}`;
          return axios.put(updateUrl, eventToUpdate);

        } else {
          throw new Error("Användare redan anmäld");
        }
      })
      .then(() => {
        alert('Anmäld till event!');
        fetchEvents()
        // här skulle jag kunna använda useCallback istället. men för att simulera en "verklig" situation
        // där användaren troligen vill ha så uppdaterad info som möjligt tycker jag detta är bättre.
      })
      .catch(error => {
        alert('Ett fel hände när anmälan skulle göras:', error);
      });
  };

  const removeEvent = (event) => {
    const removeUrl = `http://localhost:3001/events/${event.id}`;
    axios.delete(removeUrl)
    .then((response) => {
      alert("Event borttaget")
      fetchEvents()
    })
    .catch((error) =>{
      alert(error)
    })
  }

  return (
    <div>
      <h1>Lista av tillgängliga evenemang</h1>
      <table className="event-table">
        <thead>
          <tr>
            <th>Evenemang</th>
            <th>Datum</th>
            <th>Tid</th>
            <th>Plats</th>
            <th>Antal Medverkande</th>
            <th>Medverkande</th>
            <th>Registrera</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.event_name}</td>
              <td>{event.event_date}</td>
              <td>{event.event_time}</td>
              <td>{event.event_location}</td>
              <td>{event.event_attendees ? event.event_attendees.length : 0}</td>
              <th><button onClick={() => showAttendees(event)}> Medverkande </button> </th>
              <td>{!event.event_attendees.includes(user.username) ? <button className='join-button' onClick={() => joinEvent(event)}>Registrera</button> : <button className='joined-button' disabled={true}>Medverkar</button>}</td>
              <td>{user.rights === "admin" ? <button className='remove-button' onClick={() => removeEvent(event)}>Avsluta</button> : <></>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {user.rights === "admin" ? <CreateEvent fetchEvents={fetchEvents} /> : <></>}
    </div>
  );
}

export default Events;
