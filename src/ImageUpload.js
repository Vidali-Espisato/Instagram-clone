import { Button, Input } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, db } from './firebase';
import firebase from "firebase";
import "./ImageUpload.css";


function ImageUpload({username}) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = e => { 
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress);
            },
            error => console.log(error),
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        })
                        setProgress(0);
                        setImage(null);
                        setCaption('');
                    })
            }
        )
    }


    return (
        <div className="imageUpload">
            <h3>Create Post</h3>
            <progress value={progress} max="100"/>
            <div className="input_fields">
                <input type="file" className="first_input" onChange={handleChange}/>
                <Input type="text" className="second_input" value={caption} placeholder="Enter a caption..." onChange={(event) => setCaption(event.target.value)}/>
            </div>
            <Button type="submit" variant="contained" color="secondary" disabled={!caption} onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload;
