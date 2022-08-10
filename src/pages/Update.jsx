import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { __getTodos, __serchTodos } from "../redux/modules/todos";
import { __postTodos } from "../redux/modules/todos";
import { __deleteTodos } from "../redux/modules/todos";
import { serchTodos } from "../redux/modules/todos";
import { useNavigate } from "react-router-dom";
import theme from "../styledcomponents/theme";
import styled from "styled-components";

const Update = () => {
  const [imgBase64, setImgBase64] = useState("images/upload.jpg"); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [imgVaule, setImgVaule] = useState("");
  const handleChangeFile = (event) => {
    setImgVaule(event.target.value);
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  const [user, userHandler, userReset] = useInput();
  const [title, titleHandler, titleReset] = useInput();
  const [body, bodyHandler, bodyReset] = useInput();
  const [serch, serchHandler, serchReset] = useInput();

  const inputData = {
    id: Date.now(),
    username: user,
    title: title,
    body: body,
    img: imgBase64,
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
    navigate("/");
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
      <InputForm
        onSubmit={(e) => {
          e.preventDefault();
          e.target.reset();
          onSubmitHandler(inputData);
        }}
      >
        <PrewImgWrap
          style={{ backgroundImage: "url(" + imgBase64 + ")" }}
        ></PrewImgWrap>

        <FileWrap>
          <FileSrc defaultValue={imgVaule} placeholder="첨부파일" />
          <InputFile htmlFor="file">파일</InputFile>
          <HideFile
            type="file"
            name="imgFile"
            id="file"
            onChange={handleChangeFile}
          />
        </FileWrap>

        <InputName //
          id="name"
          type="text"
          defaultValue={user}
          onChange={userHandler}
          placeholder="닉네임을 입력하세요."
          required
        />

        <InputName //
          id="name"
          type="text"
          defaultValue={title}
          onChange={titleHandler}
          placeholder="제목을 입력하세요."
          required
        />

        <InputText //
          id="data"
          type="text"
          defaultValue={body}
          onChange={bodyHandler}
          placeholder="내용을 입력해주세요."
          required
        />
        <SubmitButton
          type="submit"
          disabled={title.length < 1 || body.length < 1}
        >
          추가하기
        </SubmitButton>
      </InputForm>
    </>
  );
};

export default Update;

const InputForm = styled.form`
  margin-top: 40px;
`;

const InputName = styled.input`
  width: 100%;
  border-radius: 50px;
  padding: 10px;
  border: 1px solid #5060ff;
  margin-bottom: 10px;
`;

const InputText = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: 1px solid #5060ff;
  border-radius: 10px;
  resize: none;
  padding: 10px;
`;

const FileWrap = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;

const FileSrc = styled.input`
  border-radius: 20px 0px 0px 20px;
  padding: 10px;
  border: 1px solid #5060ff;
`;

const HideFile = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const InputFile = styled.label`
  width: 100%;
  color: #fff;
  font-size: 14px;
  padding-left: 8px;
  line-height: 37px;
  background-color: #5060ff;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  border-radius: 0px 20px 20px 0px;
`;

const PrewImgWrap = styled.div`
  width: 100%;
  height: 140px;
  background-position: center center;
  background-size: 100%;
  background-repeat: no-repeat;
  border: 1px solid #dddddd;
  overflow: hidden;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  border-radius: 50px;
  padding: 10px;
  color: #fff;
  margin-top: 20px;
  background-color: #7884fb;
  transition: 0.5s all;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #5060ff;
  }
`;
