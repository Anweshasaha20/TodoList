import React, { useEffect, useState } from "react";
import axios from "axios";
import InputTodo from "./inputTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  // Fetch all todos from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:1234/api/v1/todos");
      setTodos(response.data);
      //   console.log(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to add a new todo to the list
  const addTodoToList = (newTodo) => {
    console.log("Adding New Todo:", newTodo);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <InputTodo addTodoToList={addTodoToList} />

      {todos.length > 0 ? (
        <div>
          {todos.map((each, index) => (
            <p key={index}>{each.description}</p>
          ))}
        </div>
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
};

export default ListTodo;
