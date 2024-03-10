// PostList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostList = ({ posts, onDelete }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    const handleDeletePost = (postId) => {
        setPostIdToDelete(postId);
        setShowConfirmationModal(true);
    };

    const confirmDeletePost = () => {
        if (onDelete && postIdToDelete) {
            onDelete(postIdToDelete);
        }
        setShowConfirmationModal(false);
    };

    const cancelDeletePost = () => {
        setShowConfirmationModal(false);
    };

    return (
        <Container>
            <Header>
                <h2>Feed de Postagens</h2>
                <NewPostLink to="/new">Nova Postagem</NewPostLink>
            </Header>
            <PostsContainer>
                {posts.map(post => (
                    <Post key={post.id}>
                        <PostTitle>{post.title}</PostTitle>
                        <PostContent>{post.body}</PostContent>
                        <PostActions>
                            <DeleteButton onClick={() => handleDeletePost(post.id)}>Excluir</DeleteButton>
                            <CommentsLink to={`/post/${post.id}/comments`}>Ver Comentários</CommentsLink>
                        </PostActions>
                    </Post>
                ))}
            </PostsContainer>
            {showConfirmationModal && (
                <Modal>
                    <ModalContent>
                        <p>Atenção! Ao excluir esta postagem os comentários também serão excluídos.</p>
                        <DeleteButton onClick={confirmDeletePost}>Excluir</DeleteButton>
                        <CancelButton onClick={cancelDeletePost}>Cancelar</CancelButton>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const NewPostLink = styled(Link)`
  color: #fff;
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PostsContainer = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const Post = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
`;

const PostTitle = styled.h3`
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  margin-bottom: 15px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  color: #fff;
  background-color: #dc3545;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;

const CommentsLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
`;

const CancelButton = styled.button`
  color: #fff;
  background-color: #6c757d;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

export default PostList;
