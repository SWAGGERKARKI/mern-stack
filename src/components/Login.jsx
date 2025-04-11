import React from 'react';
import { Container, Button, Typography, TextField } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import axios from 'axios'; // axios for sending request to server
import { useNavigate } from 'react-router-dom'; // import useNavigate for navigating the path

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  // creating instance of useNavigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default behaviour of form
    console.log(login);
    // login request to server
    try {
      await axios
        .post("http://localhost:5000/api/login", login)
        .then(res => {
          const {message, authtoken, name, email} = res.data;
          if (authtoken) {
            localStorage.setItem('authtoken', authtoken); // store token in local storage
            localStorage.setItem('name', name); // store name in local storage
            setTimeout(() => {
              navigate("/person/:id"); // navigate to home page after 1 seconds
            }, 1000);
          }
        })
        .catch(err => console.error(err));

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin(prevLogin => ({ ...prevLogin, [name]: value }));
  };

  const handleReset = () => {
    setLogin(prevLogin => ({ ...prevLogin, email: '', password: ''}));
  }

  return (
        <Container sx={{ width: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', marginBottom: '20px' }}>
            <Button 
              size="small" 
              startIcon={<HomeIcon />} 
              variant="outlined"
              onClick={() => navigate('/')}
            >Back to Home</Button>
            
            <Typography
              variant="h5"
              color="info"
              fontWeight={700}
            >Login</Typography>
          </div>
    
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={handleSubmit}>   
            <TextField
              type="email"
              size="small" 
              label="email"
              placeholder="example@gmail.com"
              name="email"
              onChange={handleChange}
              value={login.email}
            />
    
            <TextField 
              type="password"
              label="password"
              placeholder="ex: A-Z, a-z, 0-9"
              size="small"
              name="password"
              onChange={handleChange}
              value={login.password}
            />
    
            <div style={{ display: 'flex', gap: '6px', marginTop: '20px' }}>
              <Button 
                size="small" 
                variant="outlined" 
                color="error"
                onClick={handleReset}
              >Reset</Button>
    
              <Button
                type="submit" 
                size="small" 
                variant="contained" 
                sx={{ flex: '1' }}
              >Login</Button>
            </div>
          </form>
    
          
          <div className="message">
          </div>
          
        </Container>
  )
}

export default Login