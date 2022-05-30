import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import db, { storage } from "../../lib/firebase";
import "./style.css";
import firebase from 'firebase'
import { useMyContext } from "../../context/context";
import { Announcement } from "..";
const Main = ({ classData }) => {
  const { loggedInMail } = useMyContext();

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadImage = storage.ref(`images/${image.name}`).put(image);

    uploadImage.on("state_changed", () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          db.collection("announcments")
            .doc("classes")
            .collection(classData.id)
            .add({
              timstamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
              text: inputValue,
              sender: loggedInMail,
            });
        });
    });
  };
  return (
    <div className="main">
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="mainWrapper1">
            <div className="mainBackImage">
              <div className="mainEmptyStyles" />
            </div>
            <div className="mainText">
              <h1 className="mainHeading mainOverflow">
                {classData.className}
              </h1>
              <div className="mainSection mainOverflow">
                {classData.section}
              </div>
              <div className="mainWrapper2">
                <em className="mainCode">Class Code :</em>
                <div className="mainId">{classData.id}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainAnnounce">
          <div className="mainStatus">
            <p>Upcoming</p>
            <p className="mainSubText">No work due</p>
          </div>
          <div className="mainAnnouncements">
            <div className="mainAnnouncementsWrapper">
              <div className="mainAncContent">
                {showInput ? (
                  <div className="mainForm">
                    <TextField
                      id="filled-multiline-flexible"
                      multiline
                      label="Announce Something to class"
                      variant="filled"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="mainButtons">
                      <input
                        onChange={handleChange}
                        variant="outlined"
                        color="primary"
                        type="file"
                      />

                      <div>
                        <Button onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button
                          onClick={handleUpload}
                          color="primary"
                          variant="contained"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="mainTextBlockWrapper"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar />
                    <div>Announce Something to class</div>
                  </div>
                )}
              </div>
            </div>
            <Announcement classData={classData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;