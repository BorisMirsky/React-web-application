import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import {AddTaskForm} from "./taskForm.jsx";
import {ReturnLocalStorage} from "./fromLocalStorage.jsx";

 
const App = () => {	

   const [id, setId] = useState(0);

   return(
      <div>
		   <div className="container">
			   <h3 >CRUD операции над данными из localStorage </h3>
				   <div className="flex-row">
				   
					   <div className="flex-large" >
						   <AddTaskForm click={setId} />
					   </div>
					   					   
					   <div className="flex-large"  >
							<ReturnLocalStorage value={id} />
					   </div>
					   
					   <div>
					   </div>
			   </div>
		   </div>
       </div>
   )
}


ReactDOM.render(<App />, document.getElementById("root"));

export { App }