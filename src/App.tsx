import { AppBar, Container, Stack, TextField, Toolbar, Typography,Button } from "@mui/material"
import TodoItem from "./TodoItem";
import { useState } from "react";


function App() {

  const [todos, setTodos] = useState<TodoItemType[]>([]);
  
  const[name , setName] = useState<TodoItemType["name"]>(""); 
  const completeHandler =(id : TodoItemType["id"])=>{
      const newTodo :TodoItemType[] = todos.map((i)=>{
        if(id === i.id) i.isCompleted = !i.isCompleted;
        return i; 
      })
      setTodos(newTodo);
  };

  const deleteHandler = (id : TodoItemType["id"]) =>{
     const newTodo:TodoItemType[] =todos.filter((a) => a.id !== id); 
     setTodos(newTodo);
  }

  const AddTaskHandler = () => {
      const newTodo : TodoItemType = {
        name,  
        id: String(Math.random() * 1000),
        isCompleted : false,
      } 
      setTodos((prev) => [...prev ,newTodo]);
      setName(""); 
  };

  const editHandler = (id: TodoItemType["id"],
    newTitle: TodoItemType["name"]
  ) : void =>{
    const newTodo:TodoItemType[] = todos.map((i) => {
      if(i.id == id) i.name = newTitle; 
      return i; 
    })
    setTodos(newTodo);
  }
  return (
    <>
      <Container maxWidth = "sm" sx={{height: "80vh"}}>
        <AppBar position="static" >
          <Toolbar sx={{justifyContent : "center"}}>
            <Typography sx={{textAlign : "center"}}>
                To-Do App 
            </Typography>
          </Toolbar>
        </AppBar>
        <Stack height={"80%"} paddingTop={"10px"}> 
          {todos.map((i) => {
            return <TodoItem todo={i} key={i.id} completeHandler={completeHandler} deleteHandler={deleteHandler} editHandler={editHandler}/>
          })}
        </Stack>
        <TextField fullWidth label = "Add task.."  onChange={(e) => setName(e.target.value)} onKeyDown={(e) => {
              if (e.key === "Enter" && name !== "") 
                AddTaskHandler(); 
            }}/>
        <Button
        sx={{
          margin: "1rem 0",
        }}
        fullWidth
        variant="contained"
        onClick={AddTaskHandler}
        disabled = {name === ""}
      >
        ADD
      </Button> 
        
      </Container>
      
    </> 
  );
}

export default App; 
