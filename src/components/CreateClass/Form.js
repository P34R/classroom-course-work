import { Button, DialogActions, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useMyContext } from '../../context/context';
import {v4 as uuidV4} from 'uuid'
import db from '../../lib/firebase';
const Form = () => {
    const [className,setClassName] = useState();
    const [section,setSection] = useState();
    const [subject,setSubject] = useState();
    const [room,setRoom] = useState();

    const {loggedInMail,setCreateClassDialog} = useMyContext();
    const addClass=(e)=>{
        e.preventDefault();
        const id = uuidV4();
        db.collection('CreatedClasses')
        .doc(loggedInMail)
        .collection('classes')
        .doc(id).set({
            owner:loggedInMail,
            className:className,
            section:section,
            room:room,
            id:id,
        }).then(()=>{
            setCreateClassDialog(false);
        })
    }
  return (
    <div className="form">
        <p className="classTitle">Create Class</p>
        <div className="formInputs">
            <TextField 
                id ="filled-basic" 
                label="Class Name (required)"
                className="formInput"
                variant="filled"
                value={className}
                onChange={(e)=>setClassName(e.target.value)}
            />    
            <TextField 
                id ="filled-basic" 
                label="Section"
                className="formInput"
                variant="filled"
                value={section}
                onChange={(e)=>setSection(e.target.value)}
            />    
            <TextField 
                id ="filled-basic" 
                label="Subject"
                className="formInput"
                variant="filled"
                value={subject}
                onChange={(e)=>setSubject(e.target.value)}
            />
            <TextField 
                id ="filled-basic" 
                label="Room"
                className="formInput"
                variant="filled"
                value={room}
                onChange={(e)=>setRoom(e.target.value)}
            />        
        </div>    
        <DialogActions>
            <Button onClick={addClass} color="primary">Create</Button>
        </DialogActions>
    </div>
  )
}

export default Form