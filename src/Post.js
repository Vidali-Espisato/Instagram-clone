import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import Icon from '@material-ui/core/Icon';
import { Button, Input } from '@material-ui/core';
import firebase from 'firebase';

function Post({ postId, user, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                // .orderBy("timestamp", "asc")
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        }
    }, [postId])

    const addComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            text: comment,
            user: user.displayName
        })
        setComment('');
    }

    return (
        <div className="Post">
            <div className="Post__header">
                <Avatar className="Post__avatar" alt="Manish Roy" src="/static/manish"/>
                <h3>{ username }</h3>
            </div>
            <img className="Post__image" src={ imageUrl } alt=""/>
            <div className="Post__text">
                <p><strong>{ username }</strong> { caption }</p>
            </div>

            <div className="Post__comments">
                {
                    comments.map(comment => (
                        <p><strong>{comment.user}</strong> {comment.text}</p>
                    ))
                }
            </div>

            {
                user && (
                    <form className="Post__comment">
                        <Input className="Comment__box" type="text" value={comment} placeholder="Add a comment..." onChange={(e) => setComment(e.target.value)}/>
                        <Button className="Comment__button" type="submit" disabled={!comment} variant="outlined" color="secondary" endIcon={<Icon>send</Icon>} onClick={addComment}></Button>
                    </form>
                )
            }
        </div>
    )
}

export default Post;
