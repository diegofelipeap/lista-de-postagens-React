import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './style/globalStyle';


const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #1877f2;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PostItem = styled.li`
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin-bottom: 10px;
`;

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState(''); // Adicionado aqui
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      setPosts([
        { id: 1, title: 'Post 1', content: 'Conteúdo do Post 1', comments: [{ id: 1, text: 'Comentário 1' }, { id: 2, text: 'Comentário 2' }] },
        { id: 2, title: 'Post 2', content: 'Conteúdo do Post 2', comments: [] },
        { id: 3, title: 'Post 3', content: 'Conteúdo do Post 3' },
      ]);
    }, 1000);
  }, []);

  const handleAddPost = () => {
    const newPost = {
      id: Date.now(),
      title: newPostTitle,
      content: newPostContent, // Adiciona o conteúdo do post corretamente
      comments: []
    };
    setPosts([...posts, newPost]);
    setNewPostTitle('');
    setNewPostContent(''); // Limpa o conteúdo do novo post após adicioná-lo
  };

  const handleDeletePost = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    }).then(() => {
      setPosts(posts.filter(post => post.id !== postId));
    });
  };

  const handleAddComment = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), { id: Date.now(), text: newComment }]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setNewComment('');
  };

  const handleDeleteComment = (postId, commentId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId)
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <h1>Feed de Postagens</h1>
        <Input
          type="text"
          placeholder="Título do Post"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Conteúdo do Post"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <Button onClick={handleAddPost}>Adicionar Post</Button>

        <PostList>
          {posts.map((post) => (
            <PostItem key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <Button onClick={() => handleDeletePost(post.id)}>Excluir Post</Button>
              <CommentList>
                {post.comments && post.comments.map((comment) => (
                  <CommentItem key={comment.id}>
                    <p>{comment.text}</p>
                    <Button onClick={() => handleDeleteComment(post.id, comment.id)}>Excluir Comentário</Button>
                  </CommentItem>
                ))}
              </CommentList>
              <Input
                type="text"
                placeholder="Adicionar Comentário"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button onClick={() => handleAddComment(post.id)}>Adicionar Comentário</Button>
            </PostItem>
          ))}
        </PostList>
      </Container>
    </>
  );
};

export default App;