import axios from 'axios'
import React , {useState, useEffect} from 'react'

export function App() {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

const rootUrl = 'http://localhost:8000/todos/'

const project = axios.create({
  baseURL:'http://localhost:8000'
})

const fetchProjects  = async () =>{
  const response = await project.get('/todos/')
  setTasks(response.data)
}

useEffect( () => {
  fetchProjects()
},[])

const addTask = (event) => {
  event.preventDefault()
  axios.post(rootUrl,{
    'title': input
  })
  .catch(err => console.log(err))
  
  tasks.push({
    title: input
  })
  
  setInput('')
}
console.log(tasks)
// const arr_tasks = tasks.split(',')
  return (
    <div className="App">
      <div>
      <h1>List of TODOs</h1>
      </div>
      <ul>
      {
        tasks.map((task,index)=> {
          return <li key = {index}>{task.title}</li>
        })
      }
      </ul>
      <div>
        <h1>Create a ToDo</h1>
        <form >
          <div>
            <label for="todo">ToDo: </label>
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
     
      </div>
    </div>
  );
}

export default App;
