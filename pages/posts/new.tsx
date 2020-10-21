import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Header = styled.header`
  background-color: #090a0b;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.h1`
  color: #c73535;
  font-size: 50px;
`;
const StyledLink = styled.a`
  color: #fff;
  font-size: 24px;
  padding: 8px 14px;
  margin: 20px 0;
  color: #fff;
  line-height: 1em;
  border-radius: 10px;
  cursor: pointer;
  display: block;
  transform: scale(1);
  opacity: 0.7;
  transition: all 0.3s ease;
  text-align: center;
  &:hover {
    transform: scale(1.05);
  }
`;

const Main = styled.main`
  background-color: #191b1f;
  flex-grow: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin: 40px auto;
  input,
  textarea,
  button {
    width: 100%;
    margin-bottom: 1.5em;
    font-size: 16px;
    line-height: 24px;
    color: #92a3ab;
    border-radius: 15px;
    padding: 6px 10px;
    border: none;
    outline: none;
  }
  button {
    color: #fff;
    font-weight: bold;
    background-color: #a51717;
  }
`;
const Container = styled.div`
  max-width: 1170px;
  margin: 0 auto;
`;

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      title,
      body,
    };
    axios
      .post("https://simple-blog-api.crew.red/posts", newPost)
      .then((response) => {
        console.log(response);
        setTitle("");
        setBody("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Page>
      <Header>
        <Title>Создать новый пост</Title>
      </Header>
      <Main>
        <Container>
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Заголовок поста"
              value={title}
              onChange={({ target }) => {
                setTitle(target.value);
              }}
            />
            <textarea
              name="body"
              placeholder="Текст поста"
              value={body}
              onChange={({ target }) => {
                setBody(target.value);
              }}
            />
            <button type="submit">Add New Post</button>
          </Form>
          <Link href="/">
            <StyledLink>Вернуться на главную</StyledLink>
          </Link>
        </Container>
      </Main>
    </Page>
  );
}
