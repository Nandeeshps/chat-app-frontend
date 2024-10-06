// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Auth.css'; // Import the CSS file

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navi = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('https://chat-app-backend-x7x7.onrender.com/api/auth/login', { username, password });
//       localStorage.setItem('token', res.data.token);
//       navi('/chat');
//     } catch (error) {
//       console.error('Error logging in', error);
//     }
//   };

//   return (
//     <form className="auth-form" onSubmit={handleSubmit}>
//       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;








import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://chat-app-backend-x7x7.onrender.com/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/chat');
    } catch (error) {
      console.error('Error logging in', error);
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
          <input type="radio" name="slide" id="login" checked />
          <input type="radio" name="slide" id="signup" />
          <label htmlFor="login" className="slide login" onClick={() => navigate('/login')}>Login</label>
          <label htmlFor="signup" className="slide signup" onClick={() => navigate('/signup')}>Signup</label>
          <div className="slide-tab"></div>
        </div>
        <div className="form-inner">
          <form className="login" onSubmit={handleSubmit}>
            <div className="field">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            </div>
            <div className="field">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            </div>
            <div className="pass-link">
              <a href="#">Forgot Password</a>
            </div>
            <div className="field">
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">Not a member?<br />
              <a href="#" onClick={() => navigate('/signup')}>Signup Now</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
