import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getTodos } from "../redux/modules/todos";
import { __deleteTodos } from "../redux/modules/todos";
import styled, { keyframes } from "styled-components";
import { timeForToday } from "./Time";
import Update from "./Update";
import {
  __deleteComents,
  __getComents,
  __postComents,
} from "../redux/modules/coment";

const Coments = ({ comentid }) => {
  const { coments } = useSelector((state) => state.coment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getComents());
  }, []);

  const deleteHandler = (id) => {
    dispatch(__deleteComents(id));
  };

  return (
    <div>
      {coments.map((item) => {
        if (item.todoId == comentid) {
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
              }}
            >
              <ComentsText>{item.coment}</ComentsText>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => deleteHandler(item.id)}
              >
                x
              </span>
            </div>
          );
        }
      })}
    </div>
  );
};

const ComentsText = styled.p`
  font-size: 14px;
  line-height: 24px;
`;

const Home = ({ isDarkMode, toggleDarkMode }) => {
  const { todos } = useSelector((state) => state.todos);
  const [comentValue, setComentValue] = useState("");
  const [todosID, SetTodosID] = useState(0);
  const [comentMode, setComentMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(__deleteTodos(id));
  };

  const showComentHandler = (id) => {
    setComentMode(!comentMode);
    SetTodosID(id);
  };

  let post = {
    todoId: todosID,
    coment: comentValue,
  };

  const submitComent = () => {
    if (comentValue.trim() === "") {
      alert("내용을 작성하세요.");
      return false;
    }
    dispatch(__postComents(post));
    setComentValue("");
  };

  useEffect(() => {
    dispatch(__getTodos());
  }, []);

  // function ThemeToggle({ toggle, mode }) {
  //   console.log("Click");
  //   return (

  //   );
  // }

  return (
    <Wrap>
      <Container>
        <Nav>
          <Logo>
            <LogoSpan>Board List</LogoSpan>
            {/* <LogoSpan>List</LogoSpan> */}
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
                    <span style={{ fontSize: "14px" }}>{todo.username}</span> /{" "}
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
                        onClick={() => showComentHandler(todo.id)}
                      />
                    </ChatButton>
                  </ButtonContainer>
                </Card>
              ))
            )}
          </div>
        </Section>
        <Info>
          {comentMode === true ? (
            <div>
              <Coments comentid={todosID} />
              <ComentsInput
                type="text"
                onChange={(e) => {
                  setComentValue(e.target.value);
                }}
                placeholder="댓글을 입력하세요."
                value={comentValue}
              />
              <ComentsButton onClick={submitComent}>작성</ComentsButton>
            </div>
          ) : null}
        </Info>
      </Container>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #dfe4f5;
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
  padding: 48px;
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
  width: 70px;
  height: 70px;
  border-radius: 5px;
  background-size: cover;
  background-position: center center;
  box-shadow: 2px 4px 2px 2px grey;
`;

const TextWrap = styled.div`
  width: 100%;
  cursor: pointer;
  box-shadow: 2px 4px 2px 2px grey;
  border-radius: 10px;
  padding: 0px 5px 0px 5px;
  border: 1px solid black;
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
  box-shadow: 2px 2px 2px 2px grey;
  &:hover {
    transform: rotate(30deg);
    transition-duration: 0.5s;
    transition-timing-function: ease-in;
  }
  /* animation-duration: 2s; */
`;

const ChatButton = styled.button`
  width: 20px;
  background: transparent;
  margin-left: auto;
  padding: 0;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px grey;
  cursor: pointer;
  &:hover {
    transform: rotateY(180deg);
    transition-duration: 0.5s;
  }
`;

const ComentsInput = styled.input`
  border-bottom: 1px solid #7884fb;
`;

const ComentsButton = styled.button`
  background-color: #7884fb;
  color: #fff;
  padding: 0px 5px 0px 5px;
  border-radius: 5px;
`;

const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 999999;
  bottom: 4%;
  right: 3%;

  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.borderColor};
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  box-shadow: ${(props) =>
    props.mode === "dark"
      ? "0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)"
      : "0 5px 10px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)"};
`;

export default Home;
