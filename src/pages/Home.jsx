import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getTodos, __postTodos } from "../redux/modules/todos";
import { __deleteTodos } from "../redux/modules/todos";
import styled from "styled-components";
import { timeForToday } from "./Time";
import Update from "./Update";
import coment from "../redux/modules/coment";
import { __getComents, __postComents } from "../redux/modules/coment";

const Coments = ({ comentid }) => {
  console.log(comentid);
  const { coments } = useSelector((state) => state.coment);
  console.log(coments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getComents());
  }, []);

  return (
    <div>
      {coments.map((item) => {
        if (item.todoId == comentid) {
          return (
            <div key={item.id}>
              <ComentsText>{item.coment}</ComentsText>
              {/* <img style={{ width: '20px' }} src="images/trash.png"/> */}
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
  border-bottom: 1px solid #ddd;
`;

const Home = () => {
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
    dispatch(__postComents(post));
  };

  console.log(comentValue);
  console.log(todosID);

  useEffect(() => {
    dispatch(__getTodos());
  }, []);

  return (
    <Wrap>
      <Container>
        <Nav>
          <Logo>
            Todo<span style={{ color: "#000" }}>List</span>
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
                    style={{ backgroundImage: "url(" + todo.img + ")" }}
                  ></ImgWrap>
                  <TextWrap
                    onClick={() => {
                      navigate(`/deatail/${todo.id}`);
                    }}
                  >
                    <Title>{todo.title}</Title>
                    <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                      {todo.body}
                    </p>
                    <span style={{ fontSize: "14px" }}>{todo.username}</span> /{" "}
                    <Time style={{ fontSize: "14px" }}>
                      {timeForToday(todo.time)}
                    </Time>
                  </TextWrap>

                  <DeleteButton>
                    <img
                      style={{ width: "100%" }}
                      src="images/trash.png"
                      onClick={() => deleteHandler(todo.id)}
                    />
                    <img
                      style={{ width: "100%" }}
                      src="images/coment.png"
                      onClick={() => showComentHandler(todo.id)}
                    />
                  </DeleteButton>
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
const Logo = styled.h1`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #5060ff;
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
`;

const TextWrap = styled.div`
  cursor: pointer;
`;

const Title = styled.h5`
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;
`;
const Time = styled.span`
  text-align: right;
`;

const DeleteButton = styled.button`
  width: 20px;
  background: transparent;
  margin-left: auto;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
`;

const Addbutton = styled.button`
  width: 170px;
  height: 55px;
  border: none;
  font-size: 16px;
  background-color: #7884fb;
  color: #fff;
  position: fixed;
  border-radius: 20px;
  right: 10px;
  bottom: 10px;
  box-shadow: 0px 2px 20px #a7a7a7;
  cursor: pointer;
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
export default Home;
