import { Button, Checkbox, Paper, Stack, Typography, Box, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

type PropsType = {
    todo: TodoItemType;
    completeHandler: (id: TodoItemType["id"]) => void;
    deleteHandler: (id: TodoItemType["id"]) => void;
    editHandler: (id: TodoItemType["id"], name: TodoItemType["name"]) => void;
};

const TodoItem = ({ todo, deleteHandler, completeHandler, editHandler }: PropsType) => {

    const [isEditOn , setIsEditOn] = useState<boolean>(false); 
    const [textValue , setTextValue] = useState<string>("");
    return (
        <Paper
            elevation={3}
            sx={{
                padding: "0.5rem",
                marginBottom: "0.5rem", // Adds space between each Todo item
                backgroundColor: todo.isCompleted ? "#e0f7fa" : "#fff", // Background changes if completed
                borderRadius: "10px",
            }}
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                {isEditOn ? (
                    <TextField
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && textValue !== "") {
                              editHandler(todo.id, textValue);
                              setIsEditOn(false);
                            }
                        }}
                    />

                ):
                
                    
            
                (<Typography
                    variant="body1"
                    sx={{
                        flexGrow: 1, // Makes text take the remaining space
                        textDecoration: todo.isCompleted ? "line-through" : "none", // Strikes through completed tasks
                        color: todo.isCompleted ? "gray" : "black",
                    }}
                >
                    {todo.name}
                </Typography>)}
                <Checkbox checked={todo.isCompleted} onClick={() => completeHandler(todo.id)} />
                <Button
                    onClick={() => deleteHandler(todo.id)}
                    sx={{ color: "red" }} // Red delete button for better visual hierarchy
                >
                    <DeleteIcon />
                </Button>
                <Button onClick={() => setIsEditOn((prev) => !prev)}>
                    <EditIcon />
                </Button>
            </Stack>
        </Paper>
    );
};

export default TodoItem;
