import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import WeatherInfo from '../Weather/WeatherInfo';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await api.get(`/events/${id}`);
      setEvent(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching event details:', error);
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      await api.post(`/events/${id}/register`);
      toast.success('Successfully registered for the event');
      fetchEventDetails(); // Refresh event details
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error registering for event');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${id}`);
        toast.success('Event deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting event');
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="event-details-container">
      <h2>{event.name}</h2>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <p>Description: {event.description}</p>
      {event.images && event.images.map((image, index) => (
        <img key={index} src={image} alt={`Event ${index + 1}`} className="event-image" />
      ))}
      <WeatherInfo location={event.location} />
      <button onClick={handleRegister}>Register for Event</button>
      {event.createdBy === localStorage.getItem('userId') && (
        <>
          <button onClick={() => navigate(`/edit-event/${id}`)}>Edit Event</button>
          <button onClick={handleDelete}>Delete Event</button>
        </>
      )}
    </div>
  );
};

export default EventDetails;