// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import LoginRegister from './components/Auth/LoginRegister';
// import EventList from './components/Events/EventList';
// import CreateEvent from './components/Events/CreateEvent';
// import EventDetails from './components/Events/EventDetails';
// import Sidebar from './components/Layout/Sidebar';
// import Main from './components/Layout/Main';
// import auth from './services/auth';
// import './styles/App.css';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       auth.isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Navigate to="/login" />
//       )
//     }
//   />
// );

// function App() {
//   return (
//     <Router>
//       <div className="container">
//         {auth.isAuthenticated() && <Sidebar />}
//         <Main>
//           <Routes>
//             <Route path="/login" component={LoginRegister} />
//             <PrivateRoute exact path="/" component={EventList} />
//             <PrivateRoute path="/create-event" component={CreateEvent} />
//             <PrivateRoute path="/event/:id" component={EventDetails} />
//           </Routes>
//         </Main>
//       </div>
//       <ToastContainer />
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Updated imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRegister from './components/Auth/LoginRegister';
import EventList from './components/Events/EventList';
import CreateEvent from './components/Events/CreateEvent';
import EventDetails from './components/Events/EventDetails';
import Sidebar from './components/Layout/Sidebar';
import Main from './components/Layout/Main';
import auth from './services/auth';
import './styles/App.css';

// PrivateRoute component
const PrivateRoute = ({ element: Component, ...rest }) => {
  return auth.isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="container">
        {!!auth.isAuthenticated() ? <Sidebar /> : ""}
        <Main>
          <Routes>
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/" element={<PrivateRoute element={EventList} />} />
            <Route path="/create-event" element={<PrivateRoute element={CreateEvent} />} />
            <Route path="/event/:id" element={<PrivateRoute element={EventDetails} />} />
          </Routes>
        </Main>
      </div>
      <ToastContainer />
    </Router>
    
  );
}

export default App;
