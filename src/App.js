import { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "v3n0m",
      caption: "fucking awesome",
      imageUrl: "https://bitrebels.com/wp-content/uploads/2018/06/programming-languages-learn-header-image.jpg"
    },
    {
      username: "alyngdoh",
      caption: "khi khi khi khi",
      imageUrl: "https://cdn-images-1.medium.com/max/1200/1*ivjksIhvAs7TUXbQCxAU0A.jpeg"
    }
  ]);
  return (
    <div className="App">
      <div className="App__header">
        <img className="App__headerImage" src="https://fontmeme.com/images/instagram-new-logo.png" alt="instagram logo"/>
      </div>
      <h1>Hi all!</h1>
      <Post username="Manish Roy" caption="Fucking awesome" imageUrl=""/>
      <Post username="" caption="" imageUrl=""/>
      <Post username="" caption="" imageUrl="https://cdn-images-1.medium.com/max/1200/1*ivjksIhvAs7TUXbQCxAU0A.jpeg"/>

    </div>
  );
}

export default App;
