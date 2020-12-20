import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
    return (
        <div className="Post">
            <div className="Post__header">
                <Avatar className="Post__avatar" alt="Manish Roy" src="/static/manish"/>
                <h3>{ username }</h3>
            </div>
            <img className="Post__image" src={ imageUrl } alt=""/>
            <div className="Post__text">
                <p><strong>{ username }</strong>: { caption }</p>
            </div>
        </div>
    )
}

export default Post;
