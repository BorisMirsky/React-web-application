import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from "react-dom";
import {Table, Input, Button,
 InputGroup, InputGroupText, Form, 
 FormGroup, Label, InputGroupAddon,
 ListGroup, ListGroupItem} from 'reactstrap';
		 
		 

const AddTaskForm = (props) => {  
    const initialFormState = { id: null, taskId: '', title: ''} ;
	
    const [task, setTask] = useState(initialFormState);
	
	// force rerender table from form
	const forceRerender = () => {
		 props.click(i => ++i)
	   };
  
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
    //-------------------------------------------------------
  
  
    const handleInputChange = event => {
		const { name, value } = event.currentTarget;
		setTask({ ...task, [name]: value });
    }  
	
	// data from form
     function handleSubmit(event) {
		 event.preventDefault();
		 localStorage.setItem(task.taskId, JSON.stringify(task.title));
		 handleCounter();
		 task.taskId = "";
		 task.title = ""; 
		 forceRerender();
     }
	
	// data from fetch
    async function getData() {
		let myCounter;
		myCounter = localStorage['counter'] ? Number(localStorage['counter']) : 1;
		let stringUrl = 'https://jsonplaceholder.typicode.com/todos/' + myCounter;
		const response = await fetch(stringUrl, {});
		const json = await response.json();
		localStorage.setItem(json.id, JSON.stringify(json.title));
        handleCounter();
		forceRerender();
    }  


	  return (
	<div>
	 <div>	
	  <ListGroup>
        <ListGroupItem></ListGroupItem>
        <ListGroupItem>
		     <Label>Задача из удалённого источника&nbsp;&nbsp;&nbsp;&nbsp;</Label>
		     <Button 
				 outline 
				 color="primary" 
				 size="sm" 
				 onClick={getData}
			 >
				 Добавить
			 </Button>
		</ListGroupItem>
        <ListGroupItem>			
		   <Form onSubmit={handleSubmit}>			
				<div className="form-row">
			     <div className="form-group col-md-3">			  
			      <Label >TaskId</Label>
				  <Input 
					  className="form-control" 
					  type="text" 
					  name="taskId" 
					  value={task.taskId}
					  onChange={handleInputChange}
					  required
				  />			  
				 </div>			
				 <div className="form-group col-md-3">
				  <Label >Title</Label>
				   <Input 
					 className="form-control" 
					 type="text"
					 name="title" 
					 value={task.title}
					 onChange={handleInputChange}
					 required
				   />
				 </div>
		        </div>
		  	  <Label>Задача из формы&nbsp;&nbsp;&nbsp;&nbsp;</Label>
			  <Button outline color="primary" size="sm">
			  Добавить
			  </Button>
		      </Form>	
		</ListGroupItem>
        <ListGroupItem>
				<div>
				</div>
		</ListGroupItem>
      </ListGroup>
     </div>		
		</div>
	  )
}


export { AddTaskForm }