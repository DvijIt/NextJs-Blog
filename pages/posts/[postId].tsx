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

const Post = styled.section`
  display: flex;
  p {
    width: 100%;
    margin-bottom: 1.5em;
    font-size: 1.8rem;
    line-height: 1.5em;
    color: #92a3ab;
    text-align: center;
  }
`;
const Container = styled.div`
  max-width: 1170px;
  margin: 0 auto;
`;

export default function PostPage({ post }) {
  return (
    <Page>
      <Header>
        <Title>{post.title}</Title>
      </Header>

      <Main>
        <Container>
          <Post>
            <p>{post.body}</p>
            {post.comments.length > 0 && (
              <div className="comments">
                <h4>Комментарии</h4>
                <ul>
                  {post.comments.map(({ id, body }) => (
                    <li key={id}>{body}</li>
                  ))}
                </ul>
              </div>
            )}
          </Post>
          <Link href="/">
            <StyledLink>Вернуться на главную</StyledLink>
          </Link>
        </Container>
      </Main>
    </Page>
  );
}

export async function getServerSideProps({ query }) {
  const getPostsUrl = "https://simple-blog-api.crew.red/posts";
  const response = await axios.get(
    `${getPostsUrl}/${query.postId}?_embed=comments`
  );
  const post = await response.data;

  return { props: { post } };
}
