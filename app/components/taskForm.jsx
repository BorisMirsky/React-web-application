import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from "react-dom";
import {Table, Input, Button,
 InputGroup, InputGroupText, Form, 
 FormGroup, Label, InputGroupAddon,
 ListGroup, ListGroupItem} from 'reactstrap';
		 
		 
 
const AddTaskForm = () => {  
    const initialFormState = { id: null, taskId: '', title: ''} ;
	
    const [task, setTask] = useState(initialFormState);
	
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
	
     function handleSubmit(event) {
		 event.preventDefault();
		 localStorage.setItem(task.taskId, JSON.stringify(task.title));
		 handleCounter();
		 task.taskId = "";
		 task.title = ""; 
     }
	
    async function getData() {
		let myCounter;
		myCounter = localStorage['counter'] ? Number(localStorage['counter']) : 1;
		let stringUrl = 'https://jsonplaceholder.typicode.com/todos/' + myCounter;
		const response = await fetch(stringUrl, {});
		const json = await response.json();
		localStorage.setItem(json.id, JSON.stringify(json.title));
        handleCounter();
    }  

  	// -------------- localStorage----------------------
	const allStorage = () => {
		    var archive = [],
				keys = Object.keys(localStorage),
				i = 0, key;
			for (; key = keys[i]; i++) {
				archive.push( key + ':' + localStorage.getItem(key) + '     ');
			}
			return archive;
			}		
			
	const myLocalStorage = allStorage();
	
	
	// ---------------force rerender--------------------
	const [_, forceUpdate] = useReducer((x) => x + 1, 0); 	
    const reRender = () => {
        forceUpdate();
    };
			
			
   // ----------------delete item  -------------------------------
   const handleDeleteTask = (id, id1) => {
		let answer = window.confirm('Are you sure?')
		if (answer) {
		  localStorage.removeItem(id1);
          reRender(); 	  
		}
   }; 


	// ---------------- for checkbox -------------------------
	 // const [table, setTable] = useState(() => myLocalStorage.map(item => {
		  // item.checked = false;
		  // return item;
	 // }));	 	  
     // const handleOnChange = (position)  => {
	     // const tab = table.map((it) => {              
           // if (it.id === position) {
             // it.checked = !it.checked;
         // }  
         // return it;
       // });
	   // setTable(tab);
    // };   
  
  
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
				 onClick={() => { getData(); }} 
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
        <ListGroupItem></ListGroupItem>
      </ListGroup>
     </div>
	 
	 <div>
	  <Table >
		<thead>
		  <tr >
		  <th>№ </th>
			<th>TaskId</th>
			<th>Title</th>
			<th>Удалить</th>
			<th>Сделано</th>
		  </tr>
		</thead>
		<tbody>
		{myLocalStorage.length ? (
         myLocalStorage.map((task, item) => (
           <tr key={item} style={{backgroundColor: task.checked ? 'aqua' : 'white'}} >
		   <td>{item}</td>
            <td>{task.split(":")[0]}</td>
             <td>{task.split(":")[1]}</td>
             <td>
			   <Button 
				   outline 
				   color="primary" 
				   size="sm"
				   onClick={() => handleDeleteTask(item, task.split(":")[0])}
			   >
			   Delete</Button>
             </td>
			 <td>
			 
        <FormGroup check>
          <Label check>
            <Input 
			   type="checkbox"
               checked={task.checked}
               //onChange={() => handleOnChange(task.id)}
			/>{' '}
          </Label>
        </FormGroup>
		</td>
        </tr>
		))
		  ):(
			<tr>
			  <td colSpan={4}><Label><h4>Задач больше нет</h4></Label></td>
			</tr>		
		)}		
		</tbody>
            </Table>
			</div>			
		</div>
	  )
}


export { AddTaskForm }
