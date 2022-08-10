import React, { useEffect } from "react";
import styled from "styled-components";
import { __getComments } from "../redux/modules/comments";
import { __postComments } from "../redux/modules/comments";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/useInput";

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
    dispatch(__postComments(commentData));
    commentNameReset();
    commentReset();
  };

  return (
    <CommnetLayout>
      <InfoData>
        <div>{userData.img}</div>
        <div>
          <p>{userData.id}</p>
          <p>{userData.uesername}</p>
          <p>{userData.title}</p>
          <p>{userData.body}</p>
        </div>
      </InfoData>
      <CommentInputBox>
        <CommentInput>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
              commentSubmitHandler();
            }}
          >
            <input
              type="text"
              value={commentName}
              onChange={commentNameHandler}
            />
            <input type="text" value={comment} onChange={commentHandler} />
            <CommentInputBtn>
              <button type="submit">댓글추가</button>
            </CommentInputBtn>
          </form>
        </CommentInput>
      </CommentInputBox>
      <CommentBox>
        {comments.map((item) => {
          if (item.username === username) {
            return (
              <div>
                {item.commentName}
                {item.comment}
              </div>
            );
          }
        })}
      </CommentBox>
    </CommnetLayout>
  );
};

export default Comment;

const CommnetLayout = styled.div`
  width: 100%;
  height: 100%;
`;
const InfoData = styled.div``;
const CommentInputBox = styled.div``;
const CommentInput = styled.div``;
const CommentInputBtn = styled.div``;
const CommentBox = styled.div``;
