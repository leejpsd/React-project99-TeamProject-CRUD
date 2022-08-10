import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { __editTodos } from "../redux/modules/todos";
import theme from "../styledcomponents/theme";
import CustomButton from "../custom/CustomButton";

const EditContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  /* justify-content: space-around; */
  padding: 60px;
`;

const EditWrapper = styled.div`
  border: 1px solid red;
  width: 100%;
  display: flex;
  align-items: center;
`;

const LinkContainer = styled.div`
  display: flex;
  /* width: 100%; */
  border: 1px solid green;
`;

const EditNinknameSpan = styled.span`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes.nickname};
`;

const EditTitleSpan = styled.span`
  font-size: ${theme.fontSizes.title};
`;

const EditTitleBodyContainer = styled.div`
  border: 4px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-right: 20px;
`;

const ButtonContainer = styled.div`
  /* display: flex; */
  border: 1px solid black;
  width: 100%;
`;

const Deatail = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [editMode, setEditMode] = useState(false);
  const [editTitleValue, setTitleValue] = useState("");
  const [editBodyValue, setBodyValue] = useState("");
  const { id } = useParams();
  const getValue = todos.filter((item) => item.id == id);

  const changeModeHandler = () => {
    setEditMode(true);
  };

  useEffect(() => {
    setTitleValue(getValue[0].title);
    setBodyValue(getValue[0].body);
  }, []);

  const onSubmitHandler = () => {
    dispatch(
      __editTodos({
        id: Number(id),
        title: editTitleValue,
        body: editBodyValue,
      })
    );
    setEditMode(false);
  };
  return (
    <div>
      <h1>수정하기 Page</h1>
      <EditContainer>
        <LinkContainer>
          <Link to="/">돌아가기</Link>
        </LinkContainer>

        <EditWrapper>
          <EditNinknameSpan>{todos.username}</EditNinknameSpan>
          <EditTitleBodyContainer>
            <EditTitleSpan>{todos.title}</EditTitleSpan>
            <h5>{todos.body}</h5>
          </EditTitleBodyContainer>
        </EditWrapper>

        <ButtonContainer>
          <button onClick={changeModeHandler}>수정하기</button>
        </ButtonContainer>
        {/* <input type="text" placeholder='작성자'/>
                            <input type="text" placeholder='댓글'/> */}

        <div>
          <input
            type="text"
            value={editTitleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <input
            type="text"
            value={editBodyValue}
            onChange={(e) => setBodyValue(e.target.value)}
          />
          <button onClick={onSubmitHandler}>수정완료</button>
        </div>
      </EditContainer>
      ;
    </div>
  );
};

export default Deatail;
