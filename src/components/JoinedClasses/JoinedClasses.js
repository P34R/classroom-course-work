import { FolderOpen, PermContactCalendar } from '@material-ui/icons'
import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
const JoinedClasses = ({classData}) => {
  return (
    <li className="joinedList">
        <div className="joinedWrapper">
            <div className="joinedContainer">
                <div className="joinedImgWrapper"/>
                <div className="joinedImage"/>
                <div className="joinedContent">
                    <Link className="joinedTitle" to={`/${classData.id}`}>
                        <h2>{classData.className}</h2>
                    </Link>
                    <p className="joinedOwner">{classData.owner}</p>
                </div>
            </div>
            <Avatar className="joinedAvatar"/>
        </div>
        <div className="joinedBottom">
            <PermContactCalendar/>
            <FolderOpen/>
        </div>
    </li>
  )
}

export default JoinedClasses