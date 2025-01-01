import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const InputTodo = (props) => {
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description }; // shorthand for ->const body = { description: description };
      const response = await axios.post(
        "http://localhost:1234/api/v1/todos",
        body
      );
      // Add the new todo to the list and clear input
      props.addTodoToList(response.data); // Call parent function to update the list
      setDescription(""); // Clear the input field
      console.log("Response:", response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <>
      <h1 className="font-mono text-center text-5xl mt-5 ">Todo List</h1>
      <div className="flex w-full text-center  my-10 space-x-5 justify-center">
        <form className="flex" onSubmit={onSubmit}>
          <Box sx={{ width: 1000, maxWidth: "100%" }}>
            <TextField
              fullWidth
              label="Add a new Todo Item"
              id="fullWidth"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Box>

          <Box sx={{ "& button": { m: 1 } }}>
            <div>
              <Button
                variant="contained"
                size="large"
                className="bg-gray-800"
                type="submit"
              >
                ADD TODO
              </Button>
            </div>
          </Box>
        </form>
      </div>
    </>
  );
};

export default InputTodo;
