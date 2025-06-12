import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./App.css";

const API_URL = "http://localhost:5000/events";

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((response) => setEvents(response.data));
  }, []);

  const addEvent = () => {
    if (!selectedDate || !eventText) return;
    const newEvent = { date: format(selectedDate, "yyyy-MM-dd"), text: eventText, priority: false };

    axios.post(API_URL, newEvent).then((response) => {
      setEvents([...events, response.data]);
      setEventText("");
    });
  };

  const deleteEvent = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setEvents(events.filter((event) => event._id !== id));
    });
  };

  const togglePriority = (id) => {
    axios.put(`${API_URL}/${id}`).then((response) => {
      setEvents(events.map((event) => (event._id === id ? response.data : event)));
    });
  };

  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>
      <div className="calendar-container">
        <input type="date" onChange={(e) => setSelectedDate(new Date(e.target.value))} />
        <div className="input-container">
          <input type="text" placeholder="Add an event" value={eventText} onChange={(e) => setEventText(e.target.value)} />
          <button className="add-button" onClick={addEvent}>Add Task</button>
        </div>
      </div>
      <div className="events-container">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <h2>{format(new Date(event.date), "PPP")}</h2>
            <ul>
              <li className={event.priority ? "priority" : ""}>
                {event.text}
                <button className="delete-button" onClick={() => deleteEvent(event._id)}>❌</button>
                <button className="priority-button" onClick={() => togglePriority(event._id)}>
                  {event.priority ? "⭐" : "☆"}
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
