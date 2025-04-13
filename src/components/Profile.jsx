import { Button, Container, Typography, IconButton, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent } from '@mui/material';
import { Edit } from '@mui/icons-material'; // import EditIcon from material ui icons
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // import useNavigate for navigating the path 
import axios from 'axios'; // axios for sending request to server
import EditPerson from './Edit.jsx'; // import EditPerson component
import { Delete } from '@mui/icons-material'; // import DeleteIcon from material ui icons

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [person, setPerson] = useState({}); // state for person data
  const { id } = useParams(); // get id from url params
  const [openEdit, setOpenEdit] = useState(false); // state for edit dialog box
  const [openDelete, setOpenDelete] = useState(false); // state for delete dialog box

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('id'));
    console.log(loggedInUser);
  }, []);

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/person/${id}`, {
      headers: {
        'Authorization': `${localStorage.getItem('authtoken')}` // set token in header  
      }
    })
    .then(res => {
      console.log(res);
      setPerson(res.data);
    }) // set person data to state
    .catch(err => console.error(err)); // log error if any
  }, []); 

  // creating instance of useNavigate
  const navigate = useNavigate();

  // function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('authtoken'); // remove token from local storage
    localStorage.removeItem('id'); // remove name from local storage
    setLoggedInUser(''); // set logedInUser to empty string
    navigate('/'); // navigate to home page
  };

  // function to fetch person data
  const handleEdit = async () => {
    console.log(openEdit);
    try {
      await axios.get();
    } catch (err) {
      
    }
  };

  // handle change in the each field
  const handleChange = (e) => {
    const { name, value } = e.target; // extract name and value from event target
    setFormData(prevFormData => ({ ...prevFormData, name: [value]})); // set form data to state
  };

  // function to handle delete person
  const handleDelete = async () => {
    if (id) {
      try {
        axios.delete(`http://localhost:5000/api/person/${id}`, {
          headers: {
            'Authorization': `${localStorage.getItem('authtoken')}`, // set token in header
          }
        });
        setOpenDelete(false); // close delete dialog box
        navigate('/'); // navigate to home page
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant='h5' fontWeight={700} color='primary'>Person Profile</Typography>
          <Typography variant='h6'>Name: {person.name}</Typography>
          <Typography variant='h6'>Gender: {person.gender || 'Not Mentioned'}</Typography>
          <Typography variant='h6' color='text.secondary'>Email: {person.email}</Typography>
        </CardContent>

        <CardActions>
          <Button 
            variant='outlined' 
            endIcon={<Edit />} 
            onClick={() => { 
              handleEdit(); 
              setOpenEdit(true); 
            }}
          >Edit</Button>

          <Button 
            variant='contained' 
            color='error' 
            endIcon={<Delete />} 
            onClick={() => setOpenDelete(true)}
          >Delete</Button>

          <Button 
            variant='contained' 
            color='inherit' 
            onClick={handleLogout}
          >Logout</Button>
        </CardActions>
      </Card>

      {/* dialog box for delete person */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} fullWidth>
        <DialogTitle>Delete Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this profile?</DialogContentText>
          <DialogActions>
            <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
            <Button
              color='error'
              endIcon={<Delete />}
              onClick={handleDelete}
            >Delete</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* dialog box for edit person */}
      <EditPerson open={openEdit} handleClose={() => setOpenEdit(false)} id={id} />
    </Container>
  )
}

export default Profile