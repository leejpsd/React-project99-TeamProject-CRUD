import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getTodos } from "../redux/modules/todos";
import { __deleteTodos } from "../redux/modules/todos";
import styled, { keyframes } from "styled-components";
import { timeForToday } from "./Time";
import Update from "./Update";
import Comment from "./Comment";

const Home = () => {
  const [userData, setUserData] = useState({});
  const { todos } = useSelector((state) => state.todos);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(__deleteTodos(id));
  };

  const ComentHandler = (todo) => {
    setUserData(todo);
  };

  useEffect(() => {
    dispatch(__getTodos());
  }, []);
  return (
    <body>
      <Wrap>
        <Container>
          <Nav>
            <Logo>
              <LogoSpan>Board List</LogoSpan>
            </Logo>
            <Update></Update>
          </Nav>
          <Section>
            <SearchWrap>
              <Search type="text" placeholder="검색어를 입력하세요." />
              <SearchButton style={{ color: "#fff" }}>
                <img
                  style={{ width: "48%", marginRight: "5px" }}
                  src="images/search.png"
                />
              </SearchButton>
            </SearchWrap>
            <div>
              {todos.length == 0 ? (
                <p style={{ color: "#777777", textAlign: "center" }}>
                  Todo List를 추가해주세요.
                </p>
              ) : (
                todos.map((todo) => (
                  <Card key={todo.id}>
                    <ImgWrap
                      style={{
                        backgroundImage: "url(" + todo.img + ")",
                      }}
                    ></ImgWrap>
                    <TextWrap
                      onClick={() => {
                        navigate(`/deatail/${todo.id}`);
                      }}
                    >
                      <Title>{todo.title}</Title>
                      <Body style={{ fontSize: "14px", marginBottom: "5px" }}>
                        {todo.body}
                      </Body>
                      <span style={{ fontSize: "14px" }}>{todo.username}</span>{" "}
                      /{" "}
                      <Time style={{ fontSize: "14px" }}>
                        {timeForToday(todo.time)}
                      </Time>
                    </TextWrap>

                    <ButtonContainer>
                      <DeleteButton>
                        <img
                          style={{ width: "100%" }}
                          src="images/trash.png"
                          onClick={() => deleteHandler(todo.id)}
                        />
                      </DeleteButton>
                      <ChatButton>
                        <img
                          style={{ width: "100%" }}
                          src="images/coment.png"
                          onClick={() => ComentHandler(todo)}
                        />
                      </ChatButton>
                    </ButtonContainer>
                  </Card>
                ))
              )}
            </div>
          </Section>
          <Info>
            <Comment key={todos.id} userData={userData} />
          </Info>
        </Container>
      </Wrap>
    </body>
  );
};

const Wrap = styled.div`
  max-width: 100vw;
  height: 100vh;
  display: flex;
  background: -moz-linear-gradient(
    -45deg,
    #183850 0,
    #183850 25%,
    #192c46 50%,
    #22254c 75%,
    #22254c 100%
  );
  background: -webkit-linear-gradient(
    -45deg,
    #183850 0,
    #183850 25%,
    #192c46 50%,
    #22254c 75%,
    #22254c 100%
  );
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;

`;

const Container = styled.section`
  max-width: 1400px;
  height: 700px;
  margin: auto;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
`;

const Nav = styled.nav`
  width: 350px;
  height: 100%;
  padding: 48px;
`;

const typing = keyframes`
  0% {
    width: 0%;
  }
  50% {
    width: 100%;
  }
  100% {
    width: 100%;
    border-right: none;
  }
`;

const Logo = styled.h1`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #5060ff;
  display: flex;
  position: relative;
`;

const LogoSpan = styled.span`
  color: transparent;
  white-space: nowrap;
  &::before {
    content: "Board List";
    position: absolute;
    color: #5060ff;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-right: 1px solid black;
    animation: ${typing} 5s steps(31) forwards;
  }
`;

const Section = styled.div`
  padding-top: 48px;
  width: 680px;
  height: 100%;
  background-color: #f5f5fb;
  overflow: auto;
`;

const SearchWrap = styled.div`
  display: flex;
  width: 600px;
  height: 40px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 50px;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
`;

const Search = styled.input`
  width: 600px;
  border: none;
  border-radius: 50px;
  padding-left: 20px;
`;

const SearchButton = styled.button`
  width: 50px;
  background-color: #5060ff;
  border: none;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
`;

const Info = styled.div`
  width: 330px;
`;

const Card = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  width: 600px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 0 auto;
  gap: 20px;
  margin-bottom: 10px;
`;

const ImgWrap = styled.div`
  width: 100px;
  height: 80px;
  border-radius: 5px;
  background-size: cover;
  background-position: center center;
`;

const TextWrap = styled.div`
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  padding: 0px 5px 0px 5px;
`;

const Title = styled.h5`
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;
`;

const Body = styled.p`
  width: 300px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Time = styled.span`
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  gap: 10px;
`;

const DeleteButton = styled.button`
  width: 20px;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  &:hover {
    transform: rotate(30deg);
    transition-duration: 0.5s;
    transition-timing-function: ease-in;
  }
`;

const ChatButton = styled.button`
  width: 25px;
  background: transparent;
  margin-left: auto;
  padding: 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    transform: rotateY(180deg);
    transition-duration: 0.5s;
  }
`;

export default Home;
