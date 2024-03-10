import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import NewPost from './components/NewPost';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Erro ao buscar postagens:', error));
  }, []);

  const handleDeletePost = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    })
    .then(() => {
      setPosts(posts.filter(post => post.id !== postId));
    })
    .catch(error => console.error('Erro ao excluir postagem:', error));
  };

  const handleAddPost = (newPost) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
    .then(response => response.json())
    .then(data => {
      setPosts([...posts, data]);
    })
    .catch(error => console.error('Erro ao adicionar postagem:', error));
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Postagens</Link>
            </li>
            <li>
              <Link to="/new">Nova Postagem</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/">
            <PostList posts={posts} onDelete={handleDeletePost} />
          </Route>
          <Route path="/new">
            <NewPost onAdd={handleAddPost} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
