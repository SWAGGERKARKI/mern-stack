import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Edit({ open, handleClose, id }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // state for password seen icon
  const [seePassword, setSeePassword] = useState(false);

  // fetching data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/person/${id}`, {
        headers: {
          'Authorization': `${localStorage.getItem('authtoken')}`, // set token in header
        }
      })
      .then((res) => {
        console.log('response data', res.data);
        const { name, email, password } = res.data;
        setFormData(prevFormData => ({ ...prevFormData, name, email, password }));
      })
      .catch((err) => console.error(err));
  }, [id]);

  // handle change in the each field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData =>({ ...prevData, [name]: value }));
  };

  // after cliking update
  const handleUpdate = (e) => {
    e.preventDefault(); // prevent default behaviour of form
    try {
      axios.put(`http://localhost:5000/api/person/${id}`, formData);
      handleClose(); // closes the modal
      window.location.reload(); // refresh the page
    } catch (err) {
      console.error(err);
    }
  };

  return(
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle color="info" fontWeight={700}>Person Edit</DialogTitle>
      <DialogContent>
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {formData.name &&
            <TextField
              type="text"
              size="small"
              label="name"
              placeholder="ex: Bipana Khadka"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
          }

          {formData.email &&
            <TextField 
              type="text"
              size="small"
              label="email"
              placeholder="example@gmail.com"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          }

          {formData.password &&
            <TextField 
              type={seePassword ? "text" : "password"}
              label="password"
              placeholder="A-Z a-z 0-9"
              size="small"
              onChange={handleChange}
              name="password"
              value={formData.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" size="small" onClick={() => setSeePassword(!seePassword)}>
                        {seePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          }
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default Edit;