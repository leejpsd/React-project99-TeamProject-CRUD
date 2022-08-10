import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getTodos } from "../redux/modules/todos";
import { __deleteTodos } from "../redux/modules/todos";
import styled from "styled-components";
import { timeForToday } from "./Time";

const Home = () => {
  const { todos } = useSelector((state) => state.todos);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(__deleteTodos(id));
  };

  useEffect(() => {
    dispatch(__getTodos());
  }, []);

  return (
    <>
      {/* 레이아웃테스트 */}
      <NavBox>
        <NavBoxItem>
          <NavInput type="text" />
          <NavButtonGroup>
            <span class="material-symbols-outlined">search</span>
            <span
              onClick={() => {
                navigate("/Update");
              }}
              class="material-symbols-outlined"
            >
              add_box
            </span>
          </NavButtonGroup>
        </NavBoxItem>
      </NavBox>
      <Container>
        {todos.map((todo) => (
          <Card kye={todo.id}>
            <CardImg></CardImg>
            <CardInfo>
              <CardTitle>
                <div>{todo.title}</div>
                <span
                  onClick={() => deleteHandler(todo.id)}
                  class="material-symbols-outlined"
                >
                  delete
                </span>
              </CardTitle>
            </CardInfo>
            <IconBox>
              <Ul>
                <Li>
                  <span class="material-symbols-outlined">favorite</span>
                </Li>
                <Li>
                  <span class="material-symbols-outlined">maps_ugc</span>
                </Li>
              </Ul>
            </IconBox>{" "}
            <InfoBox>
              <p>
                <div>{timeForToday(todo.time)}</div>
              </p>
              <Info>
                <span>{todo.title}</span> {todo.body}
              </Info>
            </InfoBox>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Home;

const NavBox = styled.nav`
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: gray;
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  justify-content: center;
  padding: 5px 0;
  align-items: center;
  border: solid red 2px;
`;
const NavBoxItem = styled.nav`
  width: 20%;
  max-width: 1000px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid red 1px;
`;
const NavInput = styled.input`
  width: 200px;
  height: 25px;
  background: #fafafa;
  border: 1px solid #dfdfdf;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const NavButtonGroup = styled.div`
  padding: 0;
  margin-left: 10px;
  display: flex;
  justify-content: space-around;
  width: 80px;
  border: solid red 1px;
`;

const Container = styled.div`
  width: 80vw;
  margin: auto;
  border: solid red 3px;
  position: relative;
  flex-wrap: wrap-reverse;
  overflow: hidden;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  align-items: auto;
  flex-direction: row-reverse;
  justify-content: center;
`;
const Card = styled.div`
  min-width: 275px;
  width: 275px;
  position: relative;
  margin: 15px 15px;
  height: 350px;
  border-radius: 7px;
  background-size: cover;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px 1px rgb(0 0 0 / 30%);
  transition: 0.2s all linear;
  box-sizing: border-box;
`;
const CardImg = styled.div`
  width: 100%;
  height: 275px;
  position: relative;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: darkgray;
  //이미지
`;

const CardInfo = styled.div`
  position: relative;
  width: 100%;
  height: 35px;
  line-height: 35px;
  top: -265px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-family: "Open Sans";
  color: white;
`;

const CardTitle = styled.div`
  line-height: 35px;
  height: 35px;
  position: relative;
  font-size: 25px;
  text-align: center;
  background: darkblue;
  box-shadow: 5px 5px 10px 2px rgb(0 0 0 / 30%);
  display: flex;
  border: solid red 1px;
  align-items: center;
  justify-content: space-between;
  div {
    margin-left: 10px;
  }
  span {
    margin-right: 10px;
  }
`;
const IconBox = styled.div`
  border: solid red 2px;
  position: absolute;
  height: 50px;
  width: 100%;
  background: darkblue;
  box-shadow: 2px 2px 10px 0px rgb(0 0 0 / 50%);
  top: 240px;
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
  height: 100%;
  display: flex;
`;

const Li = styled.li`
  display: flex;
  border: solid red 1px;
  height: 100%;
  align-items: center;
  line-height: 75px;
  font-size: 1.5em;
  color: white;
  text-shadow: 5px 5px 5px rgb(0 0 0 / 50%);
  margin-left: 10px;
`;

const InfoBox = styled.div`
  border: solid red 1px;
  position: absolute;
  height: 50px;
  width: 100%;
  box-shadow: 2px 2px 10px 0px rgb(0 0 0 / 50%);
  bottom: 0;
  p div {
    font-size: 13px;
    position: absolute;
    bottom: 0px;
    margin-left: 10px;
    color: gray;
  }
`;

const Info = styled.div`
  margin-left: 10px;
  position: absolute;
  top: 0;
  span {
    font-weight: bold;
  }
`;
