// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Auth.css'; // Import the CSS file

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = { username, password };
//       await axios.post('https://chat-app-backend-x7x7.onrender.com/api/auth/signup', payload);
//       navigate('/login');
//     } catch (error) {
//       if (error.response) {
//         console.error('Error response:', error.response.data);
//       } else if (error.request) {
//         console.error('Error request:', error.request);
//       } else {
//         console.error('Error message:', error.message);
//       }
//     }
//   };

//   return (
//     <form className="auth-form" onSubmit={handleSubmit}>
//       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//       <button type="submit">Signup</button>
//     </form>
//   );
// };

// export default Signup;












import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { username, password };
      await axios.post('https://chat-app-backend-x7x7.onrender.com/api/auth/signup', payload);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className="title login">Login Form</div>
        <div className="title signup">Signup Form</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" />
          <input type="radio" name="slide" id="signup" checked />
          <label htmlFor="login" className="slide login" onClick={() => navigate('/login')}>Login</label>
          <label htmlFor="signup" className="slide signup" onClick={() => navigate('/signup')}>Signup</label>
          <div className="slide-tab"></div>
        </div>
        <div className="form-inner">
          <form className="signup" onSubmit={handleSubmit}>
            <div className="field">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            </div>
            <div className="field">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            </div>
            <div className="field">
              <input type="submit" value="Signup" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
