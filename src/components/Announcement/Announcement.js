import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import db from '../../lib/firebase';
import './style.css'
const Announcement = ( {classData}) => {
    const [announcement,setAnnouncement] = useState([]);

    useEffect(() => {
      if (classData) {
        let unsubscribe = db
          .collection("announcments")
          .doc("classes")
          .collection(classData.id)
          .onSnapshot((snap) => {
            setAnnouncement(snap.docs.map((doc) => doc.data()));
          });
        return () => unsubscribe();
      }
    }, [classData]);
  return (
    <div>
        {announcement.map((item)=>(
            <div className="ann">
                <div className="annCnt">
                    <div className="annTop">
                        <Avatar/>
                        <div>
                        {item.sender}
                        </div>
                    </div>
                    <p className="annTxt">{item.text}</p>
                    <img className="annImg" src={item.imageUrl} alt={item.text}/>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Announcement