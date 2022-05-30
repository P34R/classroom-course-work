import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Add, Apps } from '@material-ui/icons'
import { Avatar, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useMyContext } from '../../context/context'
import CreateClass from '../CreateClass/CreateClass'
import JoinClass from '../JoinClass/JoinClass'
import { useStyles } from "./style"
const Header = ({children}) => {
  const classes=useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
      setAnchorEl(null);
  }

  const {setCreateClassDialog, setJoinClassDialog, loggedIn, logout} = useMyContext();

  const handleCloseCreate =()=>{
      handleClose()
      setCreateClassDialog(true)
  }
  
  const handleJoin =()=>{
      handleClose()
      setJoinClassDialog(true)
  }

    return (
    <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.toolbar}>
                <div className={classes.headerWrapper}>
                    {children}
                    <img
                        src="http://csc.knu.ua/media/logos/2cf43725-c94a-4ce3-9db5-b5035eb9b849.png"
                        alt="KNU"
                        />
                    <Typography variant="h6" className={classes.title}>
                        Classroom
                    </Typography>
                </div>
                <div className={classes.headerWrapperRight} >
                    <Add onClick={handleClick} className={classes.icon} />
                    <Apps className={classes.icon} />
                        <Menu 
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleJoin}>Join Class</MenuItem>
                            <MenuItem onClick={handleCloseCreate}>Create Class</MenuItem>
                        </Menu>
                    <div>
                        <Avatar onClick={()=>logout()}src={loggedIn.photoURL} className={classes.icon} />
                    </div>
                </div>
            </Toolbar>
        </AppBar>
        <CreateClass/>
        <JoinClass/>
    </div>
  )
}

export default Header