import React, { useState, useRef, useEffect } from "react";
import Todolist from "./Todolist";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const LOCAL_STORAGE_KEY = "todoApp.todos";
function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (storedTodos) setTodos(storedTodos);
  }, []);

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

function toggleTodo(id) {
  const newTodos = [...todos];
  const todo = newTodos.find((todo) => todo.id === id);
  todo.complete = !todo.complete;
  setTodos(newTodos);
  }

function handleAddTodo(e) {
  const name = todoNameRef.current.value;
  if (name === "") return;
  setTodos((prevTodos) => {
  return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
  });
  todoNameRef.current.value = null;
  }

function handleCLearTodos() {
  const newTodos = todos.filter((todo) => !todo.complete);
  setTodos(newTodos);
}
return (
  <>
  <section className="test">
    
    <h3> React Task manager</h3>

    <div className="dirk">
      <p >
        <Todolist todos={todos} toggleTodo={toggleTodo} />
      </p>
      <input className="input" type="text" ref={todoNameRef} />
        
      <div className="buttons">
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleCLearTodos}>Clear Completed Todos</button>
      </div>

      <div>          
        <p>
            {todos.filter((todo) => !todo.complete).length} Tasks Left To Do
            
        </p>
      </div>
    </div>
  </section>
  </>
  );
}

export default App;
