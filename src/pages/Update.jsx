import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { __getTodos, __serchTodos } from "../redux/modules/todos";
import { __postTodos } from "../redux/modules/todos";
import { __deleteTodos } from "../redux/modules/todos";
import { serchTodos } from "../redux/modules/todos";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../css/main.css";

const Update = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  const [title, titleHandler, titleReset] = useInput();
  const [body, bodyHandler, bodyReset] = useInput();
  const [serch, serchHandler, serchReset] = useInput();

  const inputData = {
    id: Date.now(),
    title: title,
    body: body,
    time: new Date(),
  };

  const onSubmitHandler = (inputData) => {
    if (inputData.title.length < 3) {
      alert("이름을 3글자 이상 적어라");
    } else if (inputData.body.length < 5) {
      alert("내용을 5글자 이상 적어라");
    } else {
      dispatch(__postTodos(inputData));
      alert("성공");
    }
    titleReset();
    bodyReset();
    // navigate("/");
  };

  const deleteHandler = (id) => {
    dispatch(__deleteTodos(id));
  };

  useEffect(() => {
    dispatch(__getTodos());
  }, []);

  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    if (serch !== "") {
      dispatch(serchTodos(serch));
      console.log(todos);
    } else if (serch !== todos) {
      dispatch(__getTodos());
      console.log(todos);
    }
  };
  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.target.reset();
          onSubmitHandler(inputData);
        }}
      >
        <label for="name">이름:</label>
        <input //
          id="name"
          type="text"
          value={title}
          onChange={titleHandler}
          placeholder="3글자이상입력해"
          required
        />
        <label for="data">내용:</label>
        <input //
          id="data"
          type="text"
          value={body}
          onChange={bodyHandler}
          placeholder="5글자이상입력해"
          required
        />
        <button type="submit" disabled={title.length < 1 || body.length < 1}>
          추가하기
        </button>
      </form>

      <input
        type="text"
        value={serch}
        onChange={serchHandler}
        onKeyPress={handleKeyPress}
      />
      <button onClick={() => handleSearchClick()}>이름조회하기</button>
      <div>
        {todos.map((todo) => (
          <div kye={todo.id}>
            id: {todo.id} 이름: {todo.title} 내용: {todo.body}
            {todo.time}
            <button onClick={() => deleteHandler(todo.id)}> 삭제하기 </button>
            <button
              onClick={() => {
                navigate("/EditPage", {
                  state: {
                    id: todo.id,
                  },
                });
              }}
            >
              수정하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Update;

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
