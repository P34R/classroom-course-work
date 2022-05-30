import { Avatar, Button, Dialog, Slide, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useState } from 'react'
import { useMyContext } from '../../context/context'
import db from '../../lib/firebase';
import "./style.css"

const Transition = React.forwardRef(function Transition(props,ref) {
    return <Slide direction="down" ref={ref} {...props} />
})



const JoinClass = () => {
    const {joinClassDialog,setJoinClassDialog,loggedIn} = useMyContext();

    const [classCode,setClassCode] = useState('');
    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const [joinedData,setJoinedData] = useState();
    const [classExists,setClassExists] = useState(false);
    const handleJoin =(e)=>{
        e.preventDefault();
        db.collection("CreatedClasses")
        .doc(email)
        .collection('classes')
        .doc(classCode)
        .get().then((doc)=>{
            if (doc.exists && doc.owner!== loggedIn.email){
                setClassExists(true);
                setJoinedData(doc.data());
                setError(false);
            }else{
                setError(true);
                setClassExists(false);
                return;
            }
        })

        if (classExists===true){
            db.collection('JoinedClasses')
            .doc(loggedIn.email).collection('classes')
            .doc(classCode).set({
                joinedData
            }).then(()=>{
                setJoinClassDialog(false);
            })
        }
    }

  return (
    <div>
        <Dialog 
        fullScreen open={joinClassDialog} 
        onClose={()=>setJoinClassDialog(false)}
        TransitionComponent={Transition}
        >
            <div className="joinClass">
                <div className="joinClassWrapper">
                   <div className="joinClassWrapper2" >
                        <Close className="joinClassSVG" onClick={()=>setJoinClassDialog(false)}/>
                        <div className="joinClassTopHeader">
                            Join Class
                        </div>
                   </div>
                   <Button className="joinClassButton" variant="contained" color="primary" onClick={handleJoin}>
                       Join
                   </Button>
                </div>
                <div className="joinClassForm">
                    <p className="joinClassFormText">
                        You're currently signed in as 
                    </p>    
                    <div className="joinClassLoginInfo">
                        <div className="joinClassLeft">
                            <Avatar src={loggedIn.photoURL}/>
                            <div className="joinClassLoginText">
                                <div className="joinClassLoginName">
                                    {loggedIn.displayName}
                                    <div className="joinClassLoginEmail">
                                    {loggedIn.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button variant="outlined" color="primary">
                            Logout
                        </Button>
                    </div>
                </div>  
                <div className="joinClassForm">
                    <div style={{fontSize:"1.25rem",color:"#3c4043"}} className="joinClassFormText">
                        Class code
                    </div>
                    <div style={{color:"#3c4043", marginTop:"-5px"}} className="joinClassFormText">
                        Ask your teacher for the class code, then enter it here.
                    </div>
                    <div className="joinClassLoginInfo">
                        <TextField id="outlined-basic" label="Class Code" variant="outlined" value={classCode} onChange={(e)=>setClassCode(e.target.value)} error={error} helperText={error&& "No class was found"}/>
                        <TextField id="outlined-basic" label="Owner's Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                </div>
            </div>

        </Dialog>
    </div>
  )
}

export default JoinClass