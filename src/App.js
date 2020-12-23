import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';
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

const signUp = () => {
  console.log("Fuck yourself!");
}

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username,  setUsername] = useState([]);
  const [email,  setEmail] = useState([]);
  const [password,  setPassword] = useState([]);

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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="App__signup">
            <center>
              <img className="App__headerImage" src="https://fontmeme.com/images/instagram-new-logo.png" alt="instagram logo"/>
            </center>
            <Input placeholder="Username" type="text" value="" onChange={(e) => setUsername(e.target.value)}/>
            <Input placeholder="Email" type="email" value="" onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Password" type="password" value="" onChange={(e) => setPassword(e.target.value)}/>
            <Button variant="contained" color="secondary" onClick={signUp}>Sign me up!!!</Button>
          </form>
        </div>
      </Modal>
      <div className="App__header">
        <img className="App__headerImage" src="https://fontmeme.com/images/instagram-new-logo.png" alt="instagram logo"/>
        <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>Sign Up</Button>
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
