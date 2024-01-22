import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "../../global.css"
import UserContext from '../Context/UserContext';
import { CreateEvent } from '../CreateEvent';
import toast from 'react-hot-toast';

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
    toast(`Showing attendees for event: ${event.event_name}  \n${event.event_attendees}`,
    {
      duration: 6000,
      position: "top-center",
      style: {
        borderRadius: '15px',
        background: "black",
        color: 'white',
      }
    });
  };

  const joinEvent = (event) => {
    const eventsUrl = `http://localhost:3001/events/${event.id}`;
    const usersUrl = `http://localhost:3001/users`;

    axios.get(eventsUrl)
      .then(response => {
        const eventToUpdate = response.data;

        if (!eventToUpdate.event_attendees.includes(user.username)) {
          eventToUpdate.event_attendees.push(user.username);
          return axios.put(eventsUrl, eventToUpdate);
        } else {
          throw new Error("Användare redan anmäld");
        }
      })
      .then(() => {
        return axios.get(`${usersUrl}?username=${user.username}`);
      })
      .then(response => {
        const userToUpdate = response.data[0];
        if (!userToUpdate.events.includes(event.id)) {
          userToUpdate.events.push(event.id);
          return axios.put(`${usersUrl}/${userToUpdate.id}`, userToUpdate);
        }
      })
      .then(() => {
        toast.success('Anmäld till event!');
        fetchEvents();
      })
      .catch(error => {
        console.error('Ett fel hände när anmälan skulle göras:', error);
        toast.error('Ett fel hände när anmälan skulle göras');
      });
};

  //ChatGPT's version av att göra "joinEvent" i omvänd ordning:

  const unassignEvent = (event) => {
    const eventsUrl = `http://localhost:3001/events/${event.id}`;
    const usersUrl = `http://localhost:3001/users`;

    axios.get(eventsUrl)
      .then(response => {
        const eventToUpdate = response.data;

        // Remove the user from the event's attendee list
        eventToUpdate.event_attendees = eventToUpdate.event_attendees.filter(username => username !== user.username);

        return axios.put(eventsUrl, eventToUpdate);
      })
      .then(() => {
        return axios.get(`${usersUrl}?username=${user.username}`);
      })
      .then(response => {
        const userToUpdate = response.data[0];

        // Remove the event from the user's list of events
        userToUpdate.events = userToUpdate.events.filter(eventId => eventId !== event.id);

        return axios.put(`${usersUrl}/${userToUpdate.id}`, userToUpdate);
      })
      .then(() => {
        toast.success('Avanmäld från eventet!');
        fetchEvents();
      })
      .catch(error => {
        console.error('Ett fel inträffade vid avanmälan från eventet:', error);
        toast.error('Ett fel inträffade vid avanmälan från eventet');
      });
};



  const removeEvent = (event) => {
    const removeUrl = `http://localhost:3001/events/${event.id}`;
    axios.delete(removeUrl)
      .then((response) => {
        toast.error("Event borttaget")
        fetchEvents()
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Lista av tillgängliga evenemang</h1>
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
            {user.rights === "admin" ? <th>Admin</th> : <></>}
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
              <td><button onClick={() => showAttendees(event)}> Medverkande </button> </td>
              <td>{!event.event_attendees.includes(user.username) ? <button className='join-button' onClick={() => joinEvent(event)}>Registrera</button> : <button onClick={() => unassignEvent(event)} className='joined-button' >Avanmäl</button>}</td>
              <td>{user.rights === "admin" ? <button className='remove-button' onClick={() => removeEvent(event)}>Avsluta</button> : <></>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='loginContainer'>
      </div>
      {user.rights === "admin" ? <CreateEvent fetchEvents={fetchEvents} /> : <></>}
    </div>
  );
}

export default Events;
