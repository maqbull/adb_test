import React , {useState,useEffect} from 'react'

import axios from 'axios'

const TaskContext = React.createContext()

// Provider , Consumer - GithubContext.Provider / Consumer

// thats not a context , this is a separate component
const TaskProvider = ({children} ) => {

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
let resCode = 0

const addTask = async (event) => {
  event.preventDefault()
 await axios.post(rootUrl,{
    title: input
  })
  .then ( res => {
    console.log(`statusCode: ${res.status}`)
    console.log(res)
    resCode = res.status
  })
  .catch(err => console.log(err))
  
  if(resCode === 200){
    tasks.push({
      title: input
    })
  }
  
  console.log(resCode);
  
  setInput('')
}
 
useEffect( () => {
    fetchProjects()
  },[])

  return <TaskContext.Provider value={{
   tasks,input,setTasks,setInput,addTask,fetchProjects
}}>
    {children}
</TaskContext.Provider>

}

export { TaskProvider , TaskContext}