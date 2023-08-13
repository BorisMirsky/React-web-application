import React, { useState } from 'react'
import ReactDOM from "react-dom";
import {App} from "./app.jsx";
import { useLocalStorage } from './useLocalStorage.jsx';


const TaskTable = props => {
	  const [table, setTable] = useState(() => props.tasks.map(item => {
      item.checked = false;
      return item;
      }));
  
  
   const handleDeleteTask = (id, id1) => {
	    console.log('id', id);
		let answer = window.confirm('Are you sure?')
		if (answer) {
		  localStorage.removeItem(id1) //task.taskId)
		  props.deleteTask(id)
		}
   } 
  
  //const [checkedState, setCheckedState] = useState(
  //  new Array(props.tasks.length).fill()
  //);

   const handleOnChange = (position)  => {
      const tab = table.map(it => {
        if (it.id === position) {
          it.checked = !it.checked;
      }
      return it;
    });
    setTable(tab);
   }
 
   const [pls, setPls] = useLocalStorage('pls', []);

   const localStorageLength	= localStorage.length;
   
   return (
   <table>
    <thead>
      <tr>
        <th>title</th>
        <th>taskid</th>
        <th>Delete</th>
		<th>Done</th>
      </tr>
    </thead>
    <tbody>

       {props.tasks.length > 0 ? (
         props.tasks.map(task => (
	//	 pls.map(task => (
           <tr key={task.id} 
			    style={{ backgroundColor: task.checked ? 'aqua' : '#f0ffff'}}  
		   >
            <td>{task.title }</td>
             <td>{task.taskId}</td>
             <td>
               <button type="button"
			   className="button muted-button"
			   onClick={() => handleDeleteTask(task.id, task.taskId)}
			   >
			   Delete</button>
             </td>
			 <td>
			    <input 
			    type="checkbox" 
			    checked={task.checked} //checkedState[task.id]}
			    onChange={() => handleOnChange(task.id)}
			    />
			 </td>
           </tr>
        ))
       )
	   : (
         <tr>
           <td colSpan={4}>No tasks more</td>
         </tr>
       )
	   }
    </tbody>
  </table>
)}

export { TaskTable };
