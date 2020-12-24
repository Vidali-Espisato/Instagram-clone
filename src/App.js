import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from './firebase';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username,  setUsername] = useState([]);
  const [email,  setEmail] = useState([]);
  const [password,  setPassword] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    }
  }, [user, username]);

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="App__signup">
            <center>
              <img className="App__headerImage" src="https://fontmeme.com/images/instagram-new-logo.png" alt="instagram logo"/>
            </center>
            <Input placeholder="Username" type="text" onChange={e => setUsername(e.target.value)}/>
            <Input placeholder="Email" type="email" onChange={e => setEmail(e.target.value)}/>
            <Input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)}/>
            <div className="Modal__button">
              <Button type="submit" variant="contained" color="secondary" onClick={signUp}>Sign me up!!!</Button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="App__header">
        <img className="App__headerImage" src="https://fontmeme.com/images/instagram-new-logo.png" alt="instagram logo"/>
        {user ? (
          <Button variant="contained" color="secondary" onClick={() => auth.signOut()}>Log Out</Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>Sign Up</Button>
        )}
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
