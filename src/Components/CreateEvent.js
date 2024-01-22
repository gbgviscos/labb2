import axios from 'axios'
import React, { useContext, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import UserContext from '../Components/Context/UserContext';
import '../CreateEvent.css'
import toast from 'react-hot-toast';

export const CreateEvent = (props) => {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState(""); // New state for formatted date
    const [time, setTime] = useState("00:00");
    const [place, setPlace] = useState("");
    const [desc, setDesc] = useState("");
    const [duration, setDuration] = useState("00:00");
    const organizer = user.firstname + " " + user.lastname;
    const fetchEvents = props.fetchEvents

    const dateHandler = (date) => {
        const isoString = date.toISOString();
        const datePart = isoString.split('T')[0];
        const timePart = isoString.split('T')[1].substring(0, 5);
        setTime(timePart);
        setStartDate(date); // Keep startDate as a Date object
        setFormattedDate(datePart); // Set the formatted date string
    }

    const createEvent = () => {
        // const isoString = startDate.toISOString(); // "YYYY-MM-DDTHH:mm:ss.sssZ" <- Copy paste från dokumentation
        // const datePart = isoString.split('T')[0]; // "YYYY-MM-DD" <- Copy paste från dokumentation
        // const timePart = isoString.split('T')[1].substring(0, 5); // "HH:mm" <- Copy paste från dokumentation

        const eventObject = {
            "event_name": name,
            "event_date": formattedDate,
            "event_time": time,
            "event_location": place,
            "event_description": desc,
            "event_attendees": [],
            "event_duration": duration,
            "event_organizer": organizer
        };

        const url = `http://localhost:3001/events`;
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: eventObject
        };

        axios.request(config)
            .then((response) => {
                setDesc("")
                setDuration("Längd: 00:00")
                setName("")
                setPlace("")
                setStartDate(new Date())
                setTime("00:00")
                fetchEvents()
                toast.success("Evenemang skapat!")
            })
            .catch((error) => {
                toast.error(error);
                
            });
    };

    return (
        <div className='create-event-container'>
            <h3>Skapa ett event</h3>
            <div className='input-group'>
                <input className='input-field' placeholder='Namn på event' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='input-group'>
                <DatePicker className='input-field' selected={startDate} showTimeSelect dateFormat="yyyy-mm-dd h:mm aa" timeFormat="p" onChange={(date) => dateHandler(date)} />
            </div>
            <div className='input-group'>
                <input className='input-field' placeholder='Tid' value={time} disabled={true}/>
            </div>
            <div className='input-group'>
                <input className='input-field' placeholder='Längd' value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
            <div className='input-group'>
                <input className='input-field' placeholder='Plats' value={place} onChange={(e) => setPlace(e.target.value)} />
            </div>
            <div className='input-group'>
                <input className='input-field' placeholder='Beskrivning' value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div className='input-group'>
                <button className='submit-button' onClick={createEvent}>Skapa</button>
            </div>
            <div className='organizer-label'>
                <label>Organizer: {organizer}</label>
            </div>
        </div>
    )
};
