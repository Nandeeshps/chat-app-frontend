// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Auth.css'; 

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('username', username);
//       localStorage.setItem('userId', response.data.userId); // Store userId in local storage
//       navigate('/chat');
//     } catch (error) {
//       console.error('Error logging in', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
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
import './Auth.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', response.data.userId); // Store userId in local storage
      navigate('/chat');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className="title login">Login</div>
      </div>
      <div className="form-container">
        <div className="form-inner">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            </div>
            <div className="field">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            </div>
            <div className="field">
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Not a member? <a href="/signup">Signup now</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
