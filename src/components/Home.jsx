import { Container, Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Grid2, CardActions, Card, CardContent, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import EditPerson from './Edit.jsx';
import  LoginIcon  from '@mui/icons-material/Login';

function Home() {
  const [persons, setPersons] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('');

  // dialog variables for edit person
  const [openEdit, setOpenEdit] = useState(false);

  // create instance of useNavigate()
  const navigate = useNavigate();

  // getting persons from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/person")
      .then((res) => setPersons(res.data))
      .catch((err) => console.error(err));
  }, []); // empty dependency array means runs when component mounts/unmounts

  // when delete button click
  const handleDelete = async () => {
    if (selectedPerson) {
      try {
        await axios.delete(`http://localhost:5000/api/person/${selectedPerson}`);
        window.location.reload(); // reload the page
      } catch (err) {
        console.error(err);
      } 
    } 
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5' fontWeight={700} color='primary'>Person List: {persons.length}</Typography>

        <Box>
          <Button 
            color='info' 
            variant='contained' 
            size='small'
            onClick={() => navigate('/create')}
          >+ Add Person</Button>

          <Button 
            variant='contained'
            color='success'
            size='small'
            component={Link} 
            to="/login"
            sx={{ ml: '16px'}}
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
        </Box>
      </div>     

      <Grid2 container spacing={2} mt={2}>
        {persons.map((person, index) =>
          <Grid2 item xs={12} sm={6} md={4} key={person._id}>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 0.5 } }}
              // transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
            >
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant='h6'>{person.name}</Typography>
                  <Typography variant='body2' color='text.secondary'>{person.email}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton 
                    size='small'
                    onClick={() => { 
                      setSelectedPerson(person._id); 
                      setOpenEdit(true); 
                      setEdit(true);
                    }}
                  >
                    <Edit color='info' />
                  </IconButton>

                  <Button
                    size='small'
                    variant='contained'
                    color='error'
                    onClick={() => { 
                      setSelectedPerson(person._id); 
                      setOpenEdit(true); 
                      setEdit(false);
                    }}
                    startIcon={<Delete />}
                  >Delete</Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid2>
        )}  
      </Grid2>

      {/* Dialog before deletion */}
      {/* <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>Click Delete to confirm it.</DialogContentText>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button color='warning' onClick={() => { setOpen(false); handleDelete(); }}>Delete</Button>
          </DialogActions>
        </DialogContent>
      </Dialog> */}

      {/* Dialog for edit person */}
      {/* <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>This is edit modal</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <DialogActions></DialogActions>
        </DialogContent>
      </Dialog> */}

      {<Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
          {edit ? 
            <DialogTitle color="info" fontWeight={700}>Login to Edit</DialogTitle>
            : <DialogTitle color="error" fontWeight={700}>Login to Delete</DialogTitle>
          }
          <DialogContent>
            <DialogContentText>Login to edit the person.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </DialogActions>
          </Dialog>
        }
    </Container>
  );
}

export default Home;