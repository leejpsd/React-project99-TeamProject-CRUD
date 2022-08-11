import React, { useEffect } from "react";
import styled from "styled-components";
import { __getComments } from "../redux/modules/comments";
import { __postComments } from "../redux/modules/comments";
import { __deleteComment } from "../redux/modules/comments";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { timeForToday } from "./Time";

const Comment = ({ userData }) => {
  const dispatch = useDispatch();
  const [commentName, commentNameHandler, commentNameReset] = useInput();
  const [comment, commentHandler, commentReset] = useInput();
  const { comments } = useSelector((state) => state.comments);
  const { username } = userData;

  useEffect(() => {
    dispatch(__getComments());
  }, []);

  const commentData = {
    username: username,
    commentName: commentName,
    comment: comment,
    time: new Date(),
  };

  const commentSubmitHandler = () => {
    if (commentName.length >= 5) {
      alert('5글자 이하로 입력해주세요.')
      return
    } else if (comment.length <= 15) {
      alert('15글자 이상 입력해주세요.')
      return
    }
    dispatch(__postComments(commentData));
    commentNameReset();
    commentReset();
  };

  const deleteHandler = (id) => {
    dispatch(__deleteComment(id));
  };

  return (
    <CommnetLayout>
      <InfoData>
        <Card>
          <Photo
            style={{
              backgroundImage: "url(" + userData.img + ")",
            }}>
          </Photo>
          <Banner></Banner>
          <ul>
            <li>
              <b>{userData.username}</b>
            </li>
          </ul>
        </Card>
      </InfoData>
      <CommentBox>
        <div>
          <Chat_thread>
            {comments.map((item) => {
              if (item.username === username) {
                return (
                  <li>
                    {item.comment}

                    <p
                      style={{
                        fontSize: "14px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.commentName}
                      <span
                        style={{
                          fontSize: "12px",
                          marginLeft: "10px",
                          fontStyle: "italic",
                        }}
                      >
                        {timeForToday(item.time)}
                      </span>
                      <span
                        onClick={() => deleteHandler(item.id)}
                        style={{
                          fontSize: "10px",
                          marginLeft: "30px",
                          opacity: 0.5,
                        }}
                      >
                        ❌
                      </span>
                    </p>
                  </li>
                );
              }
            })}
          </Chat_thread>
        </div>
      </CommentBox>
      <CommentInputBox>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.target.reset();
            commentSubmitHandler();
          }}
        >
          <Input
            placeholder="닉네임"
            type="text"
            value={commentName}
            onChange={commentNameHandler}
          />

          <Input //15글자이상제한
            placeholder="댓글 15글자이상"
            type="text"
            value={comment}
            onChange={commentHandler}
          />
          <CommentInputBtn>
            <button type="submit">댓글추가</button>
          </CommentInputBtn>
        </form>
      </CommentInputBox>
    </CommnetLayout>
  );
};

export default Comment;
const CommnetLayout = styled.div`
  width: 100%;
  height: 100%;
  padding: 48px;
`;
const InfoData = styled.div``;
const Card = styled.div`
  z-index: 1;
  width: 100%;
  height: 230px;
  margin: 0 auto;
  border-radius: 20px;
  background-color: white;
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  ul {
    list-style: none;
    text-align: center;
    padding-left: 0;
    margin-top: 60px;
    margin-bottom: 30px;
    font-size: 20px;
  }
`;
const Photo = styled.div`
  z-index: 3;
  position: relative;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  background-color: white;
  margin: 0 auto;
  background-image: url("https://filmshotfreezer.files.wordpress.com/2011/07/untitled-1.jpg");
  background-size: cover;
  background-position: 50% 50%;
  top: 25px;
  -webkit-box-shadow: inset 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
`;

const Banner = styled.div`
  z-index: 2;
  position: relative;
  margin-top: -154px;
  width: 100%;
  height: 130px;
  background-color: rgba(120, 132, 251, 0.4);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  /* border-bottom: solid 1px lightgrey; */
  border-bottom: 1px solid lightgray;
`;

const CommentInputBox = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 25px;
  border: solid 1px #7884fb;
  margin-bottom: 5px;
  border-radius: 8px;
  padding-left: 5px;
`;

const CommentInputBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 10px;
    width: 80px;
    background-color: #7884fb;
    color: white;
  }
`;

const CommentBox = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column-reverse;
`;

const Chat_thread = styled.ul`
  margin: 5px auto 0 auto;
  padding: 0 5px 0 0;
  list-style: none;

  li {
    position: relative;
    clear: both;
    display: block;
    padding: 10px 8px 10px 10px;
    margin: 0 0 5px 0;
    font: 16px/20px "Noto Sans", sans-serif;
    border-radius: 10px;
    background-color: rgba(25, 147, 147, 0.2);
  }
  li:after {
    position: absolute;
    top: 15px;
    content: "";
    width: 0;
    height: 0;
    border-top: 15px solid rgba(25, 147, 147, 0.2);
  }
  li:nth-child(odd) {
    float: right;
    margin-right: 50px;
    color: #079f90;
  }
  li:nth-child(odd):before {
    right: -50px;
  }
  li:nth-child(odd):after {
    border-right: 15px solid transparent;
    right: -15px;
  }
  li:nth-child(even) {
    float: left;
    margin-left: 50px;
    color: #0ec879;
  }
  li:nth-child(even):before {
    left: -50px;
  }
  li:nth-child(even):after {
    border-left: 15px solid transparent;
    left: -15px;
  }
`;
