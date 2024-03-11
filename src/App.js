import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './style/globalStyle';

// Importe o ícone de opções (por exemplo, Font Awesome)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

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
  position: relative;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  z-index: 1000;
`;

const ModalText = styled.p`
  color: red;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: ${({ cancel }) => (cancel ? '#ccc' : '#ff0000')};
  color: ${({ cancel }) => (cancel ? '#000' : '#fff')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      setPosts([
        { id: 1, title: 'Post 1', content: 'Conteúdo do Post 1', comments: [{ id: 1, text: 'Comentário 1' }, { id: 2, text: 'Comentário 2' }] },
        { id: 2, title: 'Post 2', content: 'Conteúdo do Post 2', comments: [] },
        { id: 3, title: 'Post 3', content: 'Conteúdo do Post 3', comments: [] },
      ]);
    }, 500);
  }, []);

  const handleAddPost = () => {
    const existingPost = posts.find(post => post.title === newPostTitle);
    if (existingPost) {
      alert('Já existe um post com esse título!');
      return;
    }

    const newPost = {
      id: Date.now(),
      title: newPostTitle,
      content: newPostContent,
      comments: []
    };

    const updatedPosts = [...posts, newPost].sort((a, b) => a.title.localeCompare(b.title));
    setPosts(updatedPosts);
    setNewPostTitle('');
    setNewPostContent('');
  };

  const handleDeletePost = (postId) => {
    setPostIdToDelete(postId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedPosts = posts.filter(post => post.id !== postIdToDelete);
    setPosts(updatedPosts);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleAddComment = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), { id: Date.now(), text: commentInputs[postId] }]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setCommentInputs({ ...commentInputs, [postId]: '' });
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
        <Button onClick={handleAddPost}>+ Nova Postagem</Button>

        <PostList>
          {posts.map((post) => (
            <PostItem key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <ActionButton onClick={() => handleDeletePost(post.id)}>
                <FontAwesomeIcon icon={faEllipsisV} />
              </ActionButton>
              <Input
                type="text"
                placeholder="Adicionar Comentário"
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
              />
              <Button onClick={() => handleAddComment(post.id)}>Adicionar Comentário</Button>
              <CommentList>
                {post.comments && post.comments.map((comment) => (
                  <CommentItem key={comment.id}>
                    <p>{comment.text}</p>
                  </CommentItem>
                ))}
              </CommentList>
            </PostItem>
          ))}
        </PostList>
      </Container>

      {showModal && (
        <ModalOverlay open={showModal}>
          <ModalContent>
            <ModalText>Atenção! Ao excluir esta postagem os comentários também serão excluídos.</ModalText>
            <ModalButton cancel onClick={handleCancelDelete}>Cancelar</ModalButton>
            <ModalButton onClick={handleConfirmDelete}>Excluir</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default App;
