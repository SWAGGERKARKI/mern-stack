import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function Edit({ open, handleClose, id }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // fetching data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/person/${id}`)
      .then((res) => {
        const { name, email } = res.data;
        setFormData(prevFormData => ({ ...prevFormData, name, email }));
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