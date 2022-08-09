import axios from "axios";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";
import { __deleteTodos, __editTodos } from "../redux/modules/board";
import theme from "../styledcomponents/theme";

//수정
function Update({ boardId, title, info }) {
  const [todosTitle, setTodosTitle] = useState("");
  const [todosInfo, setTodosInfo] = useState("");
  const dispatch = useDispatch();

  const onClickDeleteHandler = (boardId) => {
    dispatch(__deleteTodos(boardId));
  };

  const onChangeTitle = (e) => {
    setTodosTitle(e.target.value);
  };

  const onChangeInfo = (e) => {
    setTodosInfo(e.target.value);
  };

  const boardList = { id: boardId, title: todosTitle, info: todosInfo };

  const onUpdate = (e) => {
    // e.preventDefault();
    dispatch(__editTodos(boardList));
    setTodosTitle("");
    setTodosInfo("");
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <div>
          {title}
          {info}
          <input value={todosTitle} onChange={onChangeTitle} />
          <input value={todosInfo} onChange={onChangeInfo} />
          <button onClick={() => onClickDeleteHandler(boardId)}>삭제</button>
          <button onClick={() => onUpdate(boardId)}>수정</button>
        </div>
      </ThemeProvider>
    </>
  );
}

export default Update;
