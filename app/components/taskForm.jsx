import React, { useState, useEffect, useId } from 'react'
import ReactDOM from "react-dom";
import {useLocalStorage} from "./useLocalStorage.jsx";
  

//const AddTaskForm = () => { 
const AddTaskForm = props => {
  const initialFormState = { id: null, taskId: '', title: ''} ;
  const [task, setTask] = useState(initialFormState);
  //const [task1, setTaskLocalStorage] = useLocalStorage(key,'');
  
  
  //------------counter-----------------------------
  // не убивается во время localStorage.clear()
  const [count, setCount] = useState(
    Number(localStorage.getItem('counter')) || 0
  )
  const handleCounter = () => {
    setCount(count + 1)
  }
  useEffect(()=>{
    localStorage.setItem('counter', count)
  }, [count])
  //--------------------------------------------------
  
  
  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    setTask({ ...task, [name]: value });
  }

  const handleSubmit = event => {
	event.preventDefault();
	localStorage.setItem(task.taskId, JSON.stringify(task.title));
    //if (task.taskId & task.title) return
    props.addTask(task);
    //setTask(initialFormState);
	handleCounter();
	task.taskId = "";
	task.title = "";
  }


  async function getData() {
	let myCounter = Number(localStorage['counter']); // +1;
 	handleCounter();
	let stringUrl = 'https://jsonplaceholder.typicode.com/todos/' + myCounter;
    const response = await fetch(stringUrl, {});
    const json = await response.json();
	localStorage.setItem(json.id, JSON.stringify(json.title));
  }
  
  
  
  return (
      <div>
    <form  style={{marginTop:10,marginBottom:10,marginRight:10,marginLeft:50}}>
	     <label>Send request & get response&nbsp;&nbsp;&nbsp;</label>
	     <button type="button" onClick={() => getData()} >
		 get data
		 </button>	
	</form>		  
    <form 
	     onSubmit={handleSubmit}
	     style={{marginTop:30,marginBottom:30,marginLeft:30}}>
      <label>taskId&nbsp;&nbsp;</label>
      <input 
		  type="text" 
		  name="taskId" 
		  value={task.taskId}
		  onChange={handleInputChange}
		  required
	  />
	 <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title&nbsp;&nbsp;</label>
      <input 
	     type="text"
	     name="title" 
		 value={task.title}
		 onChange={handleInputChange}
		 required
		 />
      <button style={{marginLeft:30,marginBottom:30}}>Add new task</button>
    </form>
	</div>
  )
}



export { AddTaskForm }
