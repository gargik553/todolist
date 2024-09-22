import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TodoList = () => {
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

   
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    let [todoList, setTodoList] = useState(
        [{ task: 'Sleep', isDone: false, id: uuidv4(), dateAdded: formatDate(new Date()), timeAdded: formatTime(new Date()) }]
    );

    let [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    }

    

    const handleAddTask = () => {
        const newTask = {
            task: text,
            isDone: false,
            id: uuidv4(),
            dateAdded: formatDate(new Date()), 
            timeAdded: formatTime(new Date())  
        };

        const taskExists = todoList.some((taskObj) => taskObj.task.toLowerCase() === text.toLowerCase());
        if (taskExists) {
            alert('Task Already Added');
            setText('');
        } else {
            if (text !== '') {
                setTodoList([...todoList, newTask]);
                setText('');
            } else {
                alert('Empty task');
            }
        }
    }

    const handleTaskCompleted = (id) => {
        const updatedTodoList = todoList.map((obj) => {
            if (obj.id === id) {
                return { ...obj, isDone: true };
            }
            return obj;
        });
        setTodoList(updatedTodoList);
    }

    const handleDeleteTask = (id) => {
        const updatedTodoList = todoList.filter((obj) => obj.id !== id);
        setTodoList(updatedTodoList);
    }

    return (
        <div className='m-5'>
            <h2>Welcome to Gargi's TodoList</h2>
            <div className="input-group input-group-lg">
                <span className="input-group-text" id="inputGroup-sizing-lg">Enter Your Task</span>
                <input value={text} onChange={handleChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                <button onClick={handleAddTask} className="btn btn-primary mx-3">Add</button>
            </div>
            <ol>
                {
                    todoList.map((obj) => (
                        <li key={obj.id}>
                            <span style={{ textDecoration: obj.isDone ? "line-through" : "normal" }}>
                                {obj.task}
                            </span>
                           
                            <span>
                                <button className="btn m-3 btn-success" onClick={() => handleTaskCompleted(obj.id)}>Completed</button>
                                <button className="btn m-3 btn-danger" onClick={() => handleDeleteTask(obj.id)}>Delete</button>
                            </span>
                            <span className="text-muted"> (Added on: {obj.dateAdded} at {obj.timeAdded})</span>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
}
