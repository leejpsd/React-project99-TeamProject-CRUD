import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { __editTodos, __getTodos } from '../redux/modules/todos'

const Deatail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { todos } = useSelector((state) => state.todos)
    console.log(todos)
    const [editMode, setEditMode] = useState(false)
    const [editTitleValue, setTitleValue] = useState("")
    const [editBodyValue, setBodyValue] = useState("")
    const { id } = useParams()
    const getValue = todos.filter((item) => item.id == id )

    const changeModeHandler = () => {
        setEditMode(true)
    }

    useEffect(() => {
        setTitleValue(getValue[0].title)
        setBodyValue(getValue[0].body)
    }, [])

    const onSubmitHandler = () => {
        dispatch(__editTodos({id: Number(id), title: editTitleValue, body: editBodyValue}))
        setEditMode(false)
    }
    return (
        <div>
            {todos.map((item) => {
            if (item.id == id) {
                if (editMode === false) {
                    return (
                        <div key={item.id}>
                            <h5>{item.username}</h5>
                            <h5>{item.title}</h5>
                            <h5>{item.body}</h5>
                            <Link to="/">돌아가기</Link>
                            <button onClick={changeModeHandler}>수정하기</button>

                            
                            {/* <input type="text" placeholder='작성자'/>
                            <input type="text" placeholder='댓글'/> */}
                        </div>
                    )
                } else if (editMode === true) {
                    return (
                        <div>
                            <input type="text" value={editTitleValue} onChange={(e) => setTitleValue(e.target.value)} />
                            <input type="text" value={editBodyValue} onChange={(e) => setBodyValue(e.target.value)} />
                            <button onClick={onSubmitHandler}>수정완료</button>
                        </div>
                    )
                }
            }
        })}</div>
    )
}

export default Deatail