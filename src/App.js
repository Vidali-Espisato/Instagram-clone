import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    });
  }, []);

  return (
    <div className="App">
      <div className="App__header">
        <img className="App__headerImage" src="https://fontmeme.com/images/instagram-new-logo.png" alt="instagram logo"/>
      </div>
      <h1>Hi all!</h1>
      {
        posts.map(({ id, post }) => 
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        )
      }
    </div>
  );
}

export default App;
