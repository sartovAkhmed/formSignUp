

import React, { useState } from 'react'; 
import stylles from './Tasks.module.scss'
import axios from 'axios';

export const Tasks = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tasks, setTasks] = useState([])
    async function HandlerPostTask() {
        // setTasks([value, ...tasks])
        try {
            await axios({
                method: 'POST',
                url: 'https://656c7379e1e03bfd572e5367.mockapi.io/user/1/tasks',
                data: {
                    title: title,
                    body: body
                }
            })
            const response = await axios({
                method: 'GET',
                url: 'https://656c7379e1e03bfd572e5367.mockapi.io/user/1/tasks',
            })
            setTasks(response.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data.errText, 'error');
            } else if (error instanceof Error) {
                console.log(error.message);
            }
        }   
    }
    function onClickTaskRemove(index) {
        setTasks(tasks.filter((_, i) => i !== index))
    }
    function onClickTaskEdit(index) {
        alert('Sorry')
    }
    return (
        <div className={stylles.wrapper__task}>
            <div className={stylles.tasks}>
                <h2>List Tasks</h2>
                <div className={stylles.tasksContent}>
                    <input value={title} onChange={(event) =>
                        setTitle(event.target.value)} type="text" />
                    <input value={body} onChange={(event) =>
                        setBody(event.target.value)} type="text" />
                    <button onClick={HandlerPostTask}>Added Tasks</button>
                    <button>Added Tasks</button>
                </div>
                {tasks.map((task, index) => (
                    <div className={stylles.task}>
                        <h3>{task.title}</h3>
                        <p>{task.body}</p>
                        <div className={stylles.tasksContent}>
                            <button onClick={() => onClickTaskEdit(index)}>EDIT</button>
                            <button onClick={() => onClickTaskRemove(index)}>DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}