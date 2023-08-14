import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import {TaskTable} from "./taskTable.jsx";
import {AddTaskForm} from "./taskForm.jsx";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { Button } from 'react-bootstrap';


  
const App = () => {
	
   const [tasks, setTasks] = useState([]); // sessionStorage)
   
   const addTask = task => {
      task.id = tasks.length + 1;
	  let task1 = Object.assign({}, task);
      setTasks([ ...tasks, task1 ]);
  }
  
  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }


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
						   <AddTaskForm addTask={addTask} />
					   </div>
					   <div 
						   className="flex-large"
						   style={{backgroundColor: `#f0ffff`}}
					   >
						   <h4 style={{marginTop:50,marginLeft:50}}>View all tasks</h4>
						   <TaskTable tasks={tasks} deleteTask={deleteTask}/>
					   </div>
			   </div>
		   </div>
       </div>
   )
}

ReactDOM.render(<App />, document.getElementById("root"));

//export { myCounter };