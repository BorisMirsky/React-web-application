import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
//import {TaskTable} from "./taskTable.jsx";
import {AddTaskForm} from "./taskForm.jsx";
//import {UseLocalStorage} from "./useLocalStorage.jsx";
import {ReturnLocalStorage} from "./fromLocalStorage.jsx";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { Button } from 'react-bootstrap';
//import css from 'main.css';
//TaskTable tasks={tasks} deleteTask={deleteTask}/ 

 
const App = () => {
	

   // const [tasks, setTasks] = useState([]); // useLocalStorage([])
   
   // const addTask = task => {
      // task.id = tasks.length + 1;
	  // let task1 = Object.assign({}, task);
      // setTasks([ ...tasks, task1 ]);
  // }
  
  // const deleteTask = id => {
    // setTasks(tasks.filter(task => task.id !== id))
  // }

 // <AddTaskForm addTask={addTask} />
   return(
      <div>
		   <div className="container">
			   <h3 style={{
				   backgroundColor: `#f0ffff`
				   }}
				>CRUD App with hooks & localStorage </h3>
				   <div className="flex-row">
				   
					   <div 
						   className="flex-large" 
						   style={{backgroundColor: `#dcdcdc`}}
					   >
						   <h4 style={{marginTop:50,marginLeft:50}}>Add task to localStorage</h4>
						   <AddTaskForm />
					   </div>
					   					   
					   <div
					   className="flex-large"
						   style={{backgroundColor: `#f0ffff`}}
						   ><h4 style={{marginTop:50,marginLeft:50}}>View & edit all tasks</h4>
					       <ReturnLocalStorage />
					   </div>
			   </div>
		   </div>
       </div>
   )
}

ReactDOM.render(<App />, document.getElementById("root"));



