// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import api from '../../services/api';

// const CreateEvent = () => {
//   const [eventData, setEventData] = useState({
//     name: '',
//     date: '',
//     location: '',
//     description: '',
//   });
//   const [images, setImages] = useState([]);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setEventData({ ...eventData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       Object.keys(eventData).forEach(key => formData.append(key, eventData[key]));
//       images.forEach(image => formData.append('images', image));

//       await api.post('/events', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       toast.success('Event created successfully');
//       navigate('/');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error creating event');
//     }
//   };

//   return (
//     <div className="create-event-container">
//       <h2>Create New Event</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Event Name"
//           value={eventData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="date"
//           name="date"
//           value={eventData.date}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={eventData.location}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={eventData.description}
//           onChange={handleChange}
//         />
//         <input
//           type="file"
//           multiple
//           onChange={handleImageChange}
//         />
//         <button type="submit">Create Event</button>
//       </form>
//     </div>
//   );
// };

// export default CreateEvent;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import api from '../../services/api';
// import '../../styles/App.css'; // Import the CSS file for styling

// const CreateEvent = () => {
//   const [eventData, setEventData] = useState({
//     name: '',
//     date: '',
//     location: '',
//     description: '',
//   });
//   const [images, setImages] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setEventData({ ...eventData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       Object.keys(eventData).forEach(key => formData.append(key, eventData[key]));
//       images.forEach(image => formData.append('images', image));

//       await api.post('/events', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       toast.success('Event created successfully');
//       setShowModal(false);
//       navigate('/');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error creating event');
//     }
//   };

//   return (
//     <div className="create-event-container">
//       <button className="open-modal-btn" onClick={() => setShowModal(true)}>
//         Create New Event
//       </button>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowModal(false)}>&times;</span>
//             <h2>Create New Event</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Event Name"
//                 value={eventData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="date"
//                 name="date"
//                 value={eventData.date}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="location"
//                 placeholder="Location"
//                 value={eventData.location}
//                 onChange={handleChange}
//                 required
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={eventData.description}
//                 onChange={handleChange}
//               />
//               {/* <input
//                 type="file"
//                 multiple
//                 onChange={handleImageChange}
//               /> */}
//               <button type="submit">Create Event</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateEvent;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios'; // Import axios
// import '../../styles/App.css'; // Import the CSS file for styling

// const CreateEvent = () => {
//   const [eventData, setEventData] = useState({
//     name: '',
//     date: '',
//     location: '',
//     description: '',
//   });
//   const [images, setImages] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setEventData({ ...eventData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       Object.keys(eventData).forEach(key => formData.append(key, eventData[key]));
//       images.forEach(image => formData.append('images', image));

//       // Use axios to make the POST request
//       await axios.post('http://localhost:5000/api/events', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       toast.success('Event created successfully');
//       setShowModal(false);
//       navigate('/');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error creating event');
//     }
//   };

//   return (
//     <div className="create-event-container">
//       <button className="open-modal-btn" onClick={() => setShowModal(true)}>
//         Create New Event
//       </button>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowModal(false)}>&times;</span>
//             <h2>Create New Event</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Event Name"
//                 value={eventData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="date"
//                 name="date"
//                 value={eventData.date}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="location"
//                 placeholder="Location"
//                 value={eventData.location}
//                 onChange={handleChange}
//                 required
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={eventData.description}
//                 onChange={handleChange}
//               />
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleImageChange}
//               />
//               <button type="submit">Create Event</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateEvent;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios'; // Import axios
// import '../../styles/App.css'; // Import the CSS file for styling

// const CreateEvent = () => {
//   const [eventData, setEventData] = useState({
//     name: '',
//     date: '',
//     location: '',
//     description: '',
//   });
//   const [images, setImages] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setEventData({ ...eventData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       Object.keys(eventData).forEach(key => formData.append(key, eventData[key]));
//       images.forEach(image => formData.append('images', image));

//       // Get the token from localStorage
//       const token = localStorage.getItem('token');

//       // Use axios to make the POST request with token in the headers
//     const response =   await axios.post('http://localhost:5000/api/events', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}` // Include the token here
//         }
//       });
// console.log(response.json())
//       toast.success('Event created successfully');
//       setShowModal(false);
//       navigate('/');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error creating event');
//     }
//   };

//   return (
//     <div className="create-event-container">
//       <button className="open-modal-btn" onClick={() => setShowModal(true)}>
//         Create New Event
//       </button>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowModal(false)}>&times;</span>
//             <h2>Create New Event</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Event Name"
//                 value={eventData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="date"
//                 name="date"
//                 value={eventData.date}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="location"
//                 placeholder="Location"
//                 value={eventData.location}
//                 onChange={handleChange}
//                 required
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={eventData.description}
//                 onChange={handleChange}
//               />
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleImageChange}
//               />
//               <button type="submit">Create Event</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateEvent;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios
import '../../styles/App.css'; // Import the CSS file for styling

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
  });
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(eventData).forEach(key => formData.append(key, eventData[key]));
      Array.from(images).forEach(image => formData.append('images', image));

      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Use axios to make the POST request with token in the headers
      const response = await axios.post('http://localhost:5000/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Include the token here
        }
      });

      toast.success('Event created successfully');
      setShowModal(false);
      navigate('/');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(error.response?.data?.message || 'Error creating event');
    }
  };

  return (
    <div className="create-event-container">
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        Create New Event
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Event Name"
                value={eventData.name}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={eventData.location}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={eventData.description}
                onChange={handleChange}
              />
              <input
                type="file"
                multiple
                onChange={handleImageChange}
              />
              <button type="submit">Create Event</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
