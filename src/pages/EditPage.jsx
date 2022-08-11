import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __editTodos } from "../redux/modules/todos";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditPage = () => {
  const { todos } = useSelector((state) => state.todos);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, titleHandler] = useInput();
  const [body, bodyHandler] = useInput();

  const id = location.state.id;

  const editData = {
    id: id,
    title: title,
    body: body,
  };

  const editHandler = () => {
    dispatch(__editTodos(editData));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editHandler();
      }}
    >
      <input
        defaultValue={title}
        type="text"
        onChange={titleHandler}
      />
      <input
        name="body"
        defaultValue={body}
        type="text"
        onChange={bodyHandler}
      />
      <button type="submit">수정하기</button>

      {todos.map((todo) => (
        <div>{todo.title}</div>
      ))}
    </form>
  );
};

export default EditPage;
