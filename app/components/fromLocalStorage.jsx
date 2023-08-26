import React, { useReducer, useState } from 'react';
import ReactDOM from "react-dom";
import {Table, Input, Button,
 InputGroup, InputGroupText, Form, 
 FormGroup, Label, InputGroupAddon,
 ListGroup, ListGroupItem} from 'reactstrap';
 
 

const ReturnLocalStorage = (props) => { 
  
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
	
	
   // ----------------delete item  -------------------------------
   const handleDeleteTask = (id1) => {
		let answer = window.confirm('Are you sure?')
		if (answer) {
		  localStorage.removeItem(id1);
          reRender(); 	  
		}
   }; 
	// ---- delete -> rerender this page
	const [_, forceUpdate] = useReducer((x) => x + 1, 0); 	
    const reRender = () => {
        forceUpdate();
    };

   // ----------------checkbox-------------------------------------------
   const handleOnChange = (position)  => {
	   const tab = table.map((it) => {              
         if (it.id === position) {
           it.checked = !it.checked;
       }  
       return it;
     });
	 setTable(tab);
   };
	                                      

	   return (
	   	 <div>
	  <Table >
		<thead>
		  <tr >
		  <th>№ </th>
			<th>TaskId</th>
			<th>Title</th>
			<th>Удалить</th>
			<th>Готово</th>
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
				   onClick={() => handleDeleteTask(task.split(":")[0])}
			   >
			   Delete</Button>
             </td>
			 <td>			 
        <FormGroup check>
          <Label check>
            <Input 
			   type="checkbox"
               checked={task.checked}
               onChange={()=> {handleOnCheckbox(item)}}
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
	) 
}


export {ReturnLocalStorage}