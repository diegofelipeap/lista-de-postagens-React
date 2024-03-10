// NewPost.js
import React, { useState } from 'react';
import styled from 'styled-components';

const NewPost = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('O campo título não pode estar vazio.');
      return;
    }

    if (onAdd && onAdd({ title, body })) {
      setTitle('');
      setBody('');
      setError('');
    } else {
      setError('Já existe uma postagem com este título.');
    }
  };

  return (
    <Container>
      <h2>Nova Postagem</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Título</Label>
          <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="body">Corpo</Label>
          <Textarea id="body" rows="3" value={body} onChange={(e) => setBody(e.target.value)} />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 5px;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 10px;
`;

const Button = styled.button`
  color: #fff;
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default NewPost;
