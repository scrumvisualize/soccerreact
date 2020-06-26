
import React, { useRef, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from 'axios'

export default function DailyStatusDialog({ open, onClose, onSubmit}) {

    const [dailyinput, setDailyInput] = useState('');

    const handleChange = (e) => {
        e.persist();
        const {value} = e.target;
        setDailyInput(value);
      }
    

       
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Enter today's availability ?"}</DialogTitle>
      <DialogActions>
      <InputLabel htmlFor="select">I am </InputLabel>
        <NativeSelect defaultValue={'DEFAULT'} name="dailyinput" onChange={e =>handleChange(e)} id="select">
        <option value="DEFAULT" disabled>Choose an option</option>
        <option value="in">In</option>
        <option value="out">Out</option>
        </NativeSelect>
      </DialogActions>
      <DialogActions>
        <Button onClick={onClose} color="primary">
            Cancel
            </Button>
            <Button onClick={() => onSubmit(dailyinput)} color="primary" autoFocus>
            Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}