import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { __editTodos, __getTodos } from '../redux/modules/todos'
import styled from 'styled-components'

const Deatail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { todos } = useSelector((state) => state.todos)
    const [editMode, setEditMode] = useState(false)
    const [editTitleValue, setTitleValue] = useState("")
    const [editBodyValue, setBodyValue] = useState("")
    const { id } = useParams()
    const getValue = todos.filter((item) => item.id == id)

    const changeModeHandler = () => {
        setEditMode(true)
    }

    console.log(id)
    useEffect(() => {
        setTitleValue(getValue[0]?.title)
        setBodyValue(getValue[0]?.body)
        dispatch(__getTodos());
        console.log(todos)
    }, [])
    console.log(todos)
    const onSubmitHandler = () => {
        dispatch(__editTodos({ id: Number(id), title: editTitleValue, body: editBodyValue }))
        setEditMode(false)
        navigate('/')
    }
    return (
        <Wrap>
            <DeatailWrap>
                {todos.map((item) => {
                    if (item.id == id) {
                        if (editMode === false) {
                            return (
                                <div key={item.id}>
                                    <Title>{item.title}</Title>
                                    <Wrapper><User>작성자 : {item.username}</User> <Link to="/" style={{fontSize:"14px"}}>돌아가기</Link></Wrapper>
                                    <img src={item.img} alt="" style={{margin:"20px 0px 20px 0px"}}/>
                                    <h5 style={{fontSize:"14px", fontWeight:"300"}}>{item.body}</h5>
                                    <SubmitButton onClick={changeModeHandler}>수정하기</SubmitButton>
                                </div>
                            )
                        } else if (editMode === true) {
                            return (
                                <div key={item.id}>
                                    <Title><TitleInput type="text" value={editTitleValue} onChange={(e) => setTitleValue(e.target.value)} /></Title>
                                    <Wrapper><User>작성자 : {item.username}</User> <Link to="/" style={{fontSize:"14px"}}>돌아가기</Link></Wrapper>
                                    <img src={item.img} alt="" style={{margin:"20px 0px 20px 0px"}}/>
                                    <div><BodyInput type="text" value={editBodyValue} onChange={(e) => setBodyValue(e.target.value)} /></div>
                                    <SubmitButton onClick={onSubmitHandler}>수정완료</SubmitButton>
                                </div>
                            )
                        }
                    }
                })}
            </DeatailWrap>
        </Wrap>

    )
}

const Wrap = styled.div`
    display: flex;
    height: 100vh;
`

const DeatailWrap = styled.div`
    margin: auto;
    border-radius: 20px;
    max-width: 1100px;
    padding: 50px;
    background-color: #fff;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
`

const Title = styled.h5`
    font-size: 24px;
`

const TitleInput = styled.input`
    font-size: 24px;
    padding-left: 5px;
    border-radius: 20px;
    border: 1px solid #dddddd;
`

const BodyInput = styled.input`
    font-size: 14px;
    padding-left: 5px;
    border-radius: 20px;
    border: 1px solid #dddddd;
`

const Wrapper = styled.div`
    margin-top:10px;
    display: flex;
    justify-content: space-between;
`

const User = styled.h5`
    font-size: 14px;
    font-weight: 300;
`
const SubmitButton = styled.button`
  width:200px;
  border-radius: 50px;
  padding: 10px;
  color: #fff;
  margin-top: 20px;
  background-color: #7884fb;
  transition: 0.5s all;
  font-size:14px;
  cursor: pointer;
  &:hover{
    background-color: #5060ff;
    }
`


export default Deatail