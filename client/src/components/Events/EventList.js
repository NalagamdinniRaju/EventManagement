import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showMyEvents, setShowMyEvents] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [showMyEvents]);

  const fetchEvents = async () => {
    try {
      const response = await api.get(showMyEvents ? '/events/myevents' : '/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="event-list-container">
      <h2>{showMyEvents ? 'My Events' : 'All Events'}</h2>
      <button onClick={() => setShowMyEvents(!showMyEvents)}>
        {showMyEvents ? 'Show All Events' : 'Show My Events'}
      </button>
      <div className="event-grid">
        {events.map(event => (
          <Link to={`/event/${event._id}`} key={event._id} className="event-card">
            <h3>{event.name}</h3>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            {event.images && event.images.length > 0 && (
              <img src={event.images[0]} alt={event.name} className="event-image" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventList;