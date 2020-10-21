import Link from "next/link";
import styled from "styled-components";
import { fetchposts } from "../store/actions";

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
  margin: 0 0 0 10px;
  border: 1px solid #fff;
  color: #fff;
  line-height: 1em;
  border-radius: 10px;
  cursor: pointer;
  display: block;
  transform: scale(1);
  opacity: 0.7;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;
const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Main = styled.main`
  background-color: #191b1f;
`;

const Posts = styled.section`
  display: flex;
  flex-flow: row wrap;
`;

const Post = styled.article`
  flex: 0 1 100%;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border-bottom: 1px solid #ccc;
  padding: 40px 20px;
  h2 {
    font-size: 28px;
    color: #ffffffd9;
    margin: 0;
  }
  p {
    margin-bottom: 1.5em;
    font-size: 1.8rem;
    line-height: 1.5em;
    color: #92a3ab;
  }
`;

const Container = styled.div`
  max-width: 1170px;
  margin: 0 auto;
`;

export default function Home({ posts }) {
  return (
    <Page>
      <Header>
        <Title>NextJS Blog</Title>
        <Link href="posts/new">
          <StyledLink>Написать новый пост</StyledLink>
        </Link>
      </Header>
      <Main>
        <Container>
          <Posts>
            {posts
              .sort((a, b) => b.id - a.id)
              .map(({ id, title, body }) => (
                <Link key={id} href={`posts/${id}`}>
                  <Post>
                    <h2>{title}</h2>
                    <p>{body}</p>
                  </Post>
                </Link>
              ))}
          </Posts>
        </Container>
      </Main>
    </Page>
  );
}

Home.getInitialProps = async ({ store }) => {
  await store.dispatch(fetchposts());
  const { posts } = await store.getState();
  return { posts };
};
