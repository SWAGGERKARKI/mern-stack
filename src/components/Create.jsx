import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, IconButton, RadioGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { motion } from "motion/react";

function Create() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
  });

  // create instance of useNavigate
  const navigate = useNavigate();

  // onchange event handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value}));
    console.log(formData);
  };

  // after clicking submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default behaviour of form
    try {
      await axios
        .post("http://localhost:5000/api/person", formData)
        .then((res) => { 
          console.log(res.data.message);
          document.querySelector('.message').innerHTML = `<div className="message-text">${res.data.message}</div>`;
          setTimeout(() => {
            document.querySelector('.message').innerHTML = ``;
            navigate('/');
          }, 1000); 
        })
        .catch((err) => console.error(err)); 
      // navigate('/'); // redirect to home page
    } catch (err) {
      console.error(err);
    }
    console.log(formData);
  };

  // afte clicking reset bottom
  const handleReset = () => {
    setFormData(prevFormData => ({ ...prevFormData, name: '', email: '' }));
  };

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
        >Sign Up</Typography>
      </div>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={handleSubmit}>
        <TextField
          type="text"
          size="small"
          label="name"
          placeholder="ex: Bipana Khadka"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />

        {/* Radio Input for Gender */}
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onClick={handleChange}
          >
            <FormControlLabel control={<Radio />} label='Male' value={'male'} />
            <FormControlLabel control={<Radio />} label='Female' value={'female'} />
            <FormControlLabel control={<Radio />} label='Others' value={'others'} />
          </RadioGroup>
        </FormControl>

        <TextField
          type="email"
          size="small" 
          label="email"
          placeholder="example@gmail.com"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />

        <TextField 
          type="password"
          label="password"
          placeholder="ex: A-Z, a-z, 0-9"
          size="small"
          name="password"
          onChange={handleChange}
          value={formData.password}
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
          >Submit</Button>
        </div>
      </form>

      
      <div className="message">
      </div>
      
    </Container>
  );
}

export default Create;