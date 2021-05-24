import React from 'react'
import {TaskContext} from './context/api'

export function App() {

  const{ tasks ,  input , setInput , addTask} = React.useContext(TaskContext)

  return (
    <div className="App">
      <div>
      <h1>List of TODOs</h1>
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form >
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input type="text"
            value = {input}
            onChange = {e => setInput(e.target.value)}
            />
          </div>

          <div style={{"marginTop": "5px"}}>
            <button type="submit" onClick={addTask}
           
            >Add ToDo!</button>
          </div>
        </form>
      <ul>
      {
        tasks.map((task,index)=> {
          return <li key = {index}>{task.title}</li>
        })
      }
      </ul>
      </div>
    </div>
  );
}

export default App;
