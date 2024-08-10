
import React, { useState,useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import auth from '../../services/auth';
import '../../styles/App.css';
const image1 = `${process.env.PUBLIC_URL}/image1.png`;
const image2 = `${process.env.PUBLIC_URL}/image2.png`;
const image3 = `${process.env.PUBLIC_URL}/image3.png`;

// Logo Component
const Logo = () => (
  <div className="logo">
    <img src="https://imagetolink.com/ib/w1gUZxzRlW.png" alt="easyclass" />
    <h4>easyEvents</h4>
  </div>
);

// InputField Component
const InputField = ({ type, minLength, label, name, value, onChange, onFocus, onBlur }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="input-wrap">
      <input
        type={type}
        minLength={minLength}
        name={name}
        className={`input-field ${active ? 'active' : ''}`}
        value={value}
        onChange={onChange}
        onFocus={() => setActive(true)}
        onBlur={() => value === '' && setActive(false)}
        required
      />
      <label>{label}</label>
    </div>
  );
};

// SignInForm Component
const SignInForm = ({ formData, handleChange, handleSubmit, toggleForm }) => (
  <form className="sign-in-form" onSubmit={handleSubmit}>
    <Logo />
    <div className="heading">
      <h2>Welcome Back</h2>
      <h6>Not registered yet?</h6>
      <a href="#" className="toggle" onClick={toggleForm}>
        Sign up
      </a>
    </div>
    <div className="actual-form">
      <InputField
        type="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        type="password"
        name="password"
        minLength="4"
        label="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input type="submit" value="Sign In" className="sign-btn" />
      <p className="text">
        Forgotten your password or your login details?
        <a href="#">Get help</a> signing in
      </p>
    </div>
  </form>
);

// SignUpForm Component
const SignUpForm = ({ formData, handleChange, handleSubmit, toggleForm }) => (
  <form className="sign-up-form" onSubmit={handleSubmit}>
    <Logo />
    <div className="heading">
      <h2>Get Started</h2>
      <h6>Already have an account?</h6>
      <a href="#" className="toggle" onClick={toggleForm}>
        Sign in
      </a>
    </div>
    <div className="actual-form">
      <InputField
        type="text"
        name="name"
        minLength="4"
        label="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        type="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        type="password"
        name="password"
        minLength="4"
        label="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input type="submit" value="Sign Up" className="sign-btn" />
      <p className="text">
        By signing up, I agree to the
        <a href="#">Terms of Services</a> and
        <a href="#">Privacy Policy</a>
      </p>
    </div>
  </form>
);

// Carousel Component
const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const intervalRef = useRef(null);

  const bullets = [1, 2, 3];
  const texts = [
    "Create Your Own Events",
    "Customize to Your Liking",
    "Invite Attendees Seamlessly",
  ];

  useEffect(() => {
    // Set up the interval to change the active index every 3 seconds
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex % bullets.length) + 1);
    }, 2000);

    // Clean up the interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="carousel">
      <div className="images-wrapper">
        {bullets.map((bullet) => (
          <img
            key={bullet}
            src={activeIndex === 1 ? image1 :
              activeIndex === 2 ? image2 :
              activeIndex === 3 ? image3 : null}
            className={`image img-${bullet} ${activeIndex === bullet ? 'show' : ''}`}
            // alt={`Slide ${bullet}`}
          />
        ))}
      </div>
      <div className="text-slider">
        <div className="text-wrap">
          <div
            className="text-group"
            style={{ transform: `translateY(${-(activeIndex - 1) * 2.2}rem)` }}
          >
            {texts.map((text, index) => (
              <h2 key={index}>{text}</h2>
            ))}
          </div>
        </div>
        <div className="bullets">
          {bullets.map((bullet) => (
            <span
              key={bullet}
              className={activeIndex === bullet ? 'active' : ''}
              onClick={() => setActiveIndex(bullet)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// LoginRegister Component
const LoginRegister = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isSignUpMode) {
      const response = await api.post('/auth/register', formData);
      if (response.status === 201) {
        toast.success('Registration successful. Please log in.');
        setIsSignUpMode(false);
      } else {
        toast.error(response.data.message || 'Registration failed. Please try again.');
      }
    } else {
      const response = await api.post('/auth/login', formData);
      if (response.status === 200) {
        auth.login(response.data.token);
        toast.success('Login successful');
        navigate('/');
        window.location.reload(); // Refresh the page
      } else {
        toast.error(response.data.message || 'Login failed. Please try again.');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response:', error.response);
    toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
  }
};

  const toggleForm = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  return (
    <main className={isSignUpMode ? 'sign-up-mode' : ''}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            {isSignUpMode ? (
              <SignUpForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} toggleForm={toggleForm} />
            ) : (
              <SignInForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} toggleForm={toggleForm} />
            )}
          </div>
          <Carousel />
        </div>
      </div>
    </main>
  );
};

export default LoginRegister;
