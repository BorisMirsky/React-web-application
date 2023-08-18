import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from "react-dom";




const AddTaskForm = () => {
    const initialFormState = { id: null, taskId: '', title: ''} ;
	
    const [task, setTask] = useState(initialFormState);
    //const [task1, setTaskLocalStorage] = UseLocalStorage(key,'');
  
  
    //------------counter-----------------------------
    const [count, setCount] = useState(
    Number(localStorage.getItem('counter')) || 0
    ) 	
	const handleCounter = () => {
		setCount(count + 1)
	  } 
	  useEffect(()=>{
		localStorage.setItem('counter', count)
	}, [count])

  

	const [_, forceUpdate] = useReducer((x) => x + 1, 0); 
    const reRender = () => {
        forceUpdate();
    };
	
	
    const handleInputChange = event => {
		const { name, value } = event.currentTarget;
		setTask({ ...task, [name]: value });
    }  


     function handleSubmit(event) {
		 event.preventDefault();
		 localStorage.setItem(task.taskId, JSON.stringify(task.title));
		 reRender();
		 handleCounter();
		 task.taskId = "";
		 task.title = ""; 
     }


    async function getData() {
		handleCounter();
		let myCounter;
		myCounter = localStorage['counter'] ? Number(localStorage['counter']) : 1;
		let stringUrl = 'https://jsonplaceholder.typicode.com/todos/' + myCounter;
		const response = await fetch(stringUrl, {});
		const json = await response.json();
		localStorage.setItem(json.id, JSON.stringify(json.title));
        reRender();		  
    }  
  
  
	  return (
		  <div>
			<form  style={{marginTop:10,marginBottom:10,marginRight:10,marginLeft:50}}>
				 <label>Add new task from fetch&nbsp;&nbsp;&nbsp;</label>
				 <button type="button" onClick={() => { getData();}} >
				 go
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
				 <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add new task from form</label>
			  <button style={{marginLeft:30,marginBottom:30}}>go</button>
			</form>
		</div>
	  )
}



export { AddTaskForm }
