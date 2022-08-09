import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos, __postTodos } from "../redux/modules/board";
import { useNavigate } from "react-router-dom";
import Update from "./Update";

function Test() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, board } = useSelector((state) => state.board);

  const [todos, setTodos] = useState({
    title: "",
    info: "",
    id: Date.now(),
  });

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const onSubmitHandler = (todos) => {
    dispatch(__postTodos(todos));
  };

  const onChangeTitle = (e) => {
    setTodos({
      ...todos,
      title: e.target.value,
    });
  };

  const onChangeInfo = (e) => {
    setTodos({
      ...todos,
      info: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitHandler(todos);
    setTodos({ title: "", info: "" });
  };

  return (
    <>
      <div>Test Page</div>

      <form onSubmit={onSubmit}>
        <input type="text" value={todos.title} onChange={onChangeTitle} />
        <input type="text" value={todos.info} onChange={onChangeInfo} />

        <button type="submit">Submit</button>
      </form>

      <div>
        {board.map((board) => (
          <div key={board.id}>
            <Update
              title={board.title}
              info={board.info}
              boardId={board.id}
              // content={board.content}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Test;
