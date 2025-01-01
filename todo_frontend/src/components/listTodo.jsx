import React, { useEffect, useState } from "react";
import axios from "axios";
import InputTodo from "./inputTodo";

// Import Feather icons from react-icons/fa
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  // Fetch all todos from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:1234/api/v1/todos");
      setTodos(response.data);
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

  // Function to delete a todo
  const handleDelete = async (todoid) => {
    try {
      await axios.delete(`http://localhost:1234/api/v1/todos/${todoid}`);
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.todoid !== todoid)
      );
      console.log(`Todo with ID ${todoid} deleted.`);
    } catch (error) {
      console.error(`Error deleting todo with ID ${todoid}:`, error.message);
    }
  };

  // Function to edit a todo
  const handleEdit = async (todoid) => {
    const newDescription = prompt("Enter the updated description:");
    if (newDescription) {
      try {
        const response = await axios.put(
          `http://localhost:1234/api/v1/todos/${todoid}`,
          { description: newDescription }
        );
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.todoid === todoid
              ? { ...todo, description: response.data.description }
              : todo
          )
        );
        console.log(`Todo with ID ${todoid} updated.`);
      } catch (error) {
        console.error(`Error updating todo with ID ${todoid}:`, error.message);
      }
    }
  };

  return (
    <>
      <div className="mx-32 p-4 mb-2 bg-white border ">
        <InputTodo addTodoToList={addTodoToList} />
      </div>

      {todos.length > 0 ? (
        <div>
          {todos.map((todo) => (
            <div
              key={todo.todoid} // Assuming `todoid` is a unique ID for each todo
              className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 mx-32"
            >
              <div className="flex-grow">
                <p className="text-lg italic font-mono font-semibold text-gray-600 mt-1 ml-5">
                  {todo.description}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(todo.todoid)}
                  className="p-2 text-blue-800 hover:bg-blue-100 rounded-full transition-colors duration-200"
                  aria-label="Edit item"
                >
                  <FaPencilAlt className="w-5 h-5 " />
                </button>
                <button
                  onClick={() => handleDelete(todo.todoid)}
                  className="p-2 text-red-700 hover:bg-red-100 rounded-full transition-colors duration-200"
                  aria-label="Delete item"
                >
                  <FaTrashAlt className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No todos found.</p>
      )}
    </>
  );
};

export default ListTodo;
