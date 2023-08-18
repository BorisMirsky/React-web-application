import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from "react-dom";




const ReturnLocalStorage = () => {

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

	
	
	// ---------------force rerender page--------------------
	const [_, forceUpdate] = useReducer((x) => x + 1, 0); 	
    const reRender = () => {
        forceUpdate();
    };
	
		
   // ----------------delete item  -------------------------------
   const handleDeleteTask = (id, id1) => {
		let answer = window.confirm('Are you sure?')
		if (answer) {
		  localStorage.removeItem(id1);
          forceUpdate(); 	  
		}
   }; 


   // ----------------checkbox-------------------------------------------
   const handleOnChange = (position)  => {
	  // const tab = table.map((it) => {              
        // if (it.id === position) {
          // it.checked = !it.checked;
      // }  
      // return it;
    // });
	// setTable(tab);
  };                                        


	   return (
	  <table style={{marginTop:50,marginBottom:50,marginRight:50,marginLeft:50}}>
		<thead>
		  <tr style={{marginRight:50,marginLeft:50}}>
		  <th>№ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
			<th>TaskId &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
			<th>Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
			<th>Delete&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
			<th>Done</th>
		  </tr>
		</thead>
		<tbody>

           { myLocalStorage.map((task, item) => (
           <tr key={item} >
		   <td>{item}</td>
            <td>{task.split(":")[0]}</td>
             <td>{task.split(":")[1]}</td>
             <td>
			   <button type="button"
			   className="button muted-button"
			   onClick={() => handleDeleteTask(item, task.split(":")[0])}
			   >
			   Delete</button>
             </td>
			 <td>
			    <input 
			    type="checkbox" 
			    checked={task.checked} 
			    onChange={() => handleOnChange(item)}
			    />
			 </td>
           </tr>
		   ))}
		       </tbody>
            </table>
	) 
}


export {ReturnLocalStorage}