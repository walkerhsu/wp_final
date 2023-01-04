import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAccount } from '../containers/hooks/useAccount';

import { SEND_REPONSE_MUTATION } from '../graphql';
import { useMutation } from "@apollo/client";

const FormDialog = () => {
  const { me, setAlertData } = useAccount()
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [sendResponse] = useMutation(SEND_REPONSE_MUTATION);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log(response);
    await sendResponse({
      variables: {
        input: {
          username: me,
          content: response,
        }
      }
    });
    setOpen(false);
    setAlertData('Thanks for your response!', "success");
  };

  return (
    <div>
      <Button className='contactButton' variant="outlined" onClick={handleClickOpen} style={{fontSize: 20+'px'}}>
        Contact Us
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Your Comments And Suggestions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your message here. Our team
            will regularly check user's response.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Text"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setResponse(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;