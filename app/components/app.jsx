import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import {AddTaskForm} from "./taskForm.jsx";
import {ReturnLocalStorage} from "./fromLocalStorage.jsx";

 
const App = () => {	

   return(
      <div>
		   <div className="container">
			   <h3 >CRUD операции над данными из localStorage </h3>
				   <div className="flex-row">
				   
					   <div 
						   className="flex-large" >
						   <h4></h4>
						   <AddTaskForm />
					   </div>
					   					   
					   <div
					   className="flex-large"  >

					   </div>
			   </div>
		   </div>
       </div>
   )
}


ReactDOM.render(<App />, document.getElementById("root"));

export { App }

				