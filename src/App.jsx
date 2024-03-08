import { useState, useEffect} from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

useEffect(() => {
  let todoString = localStorage.getItem("Todos")
  if(todoString){  
    let Todos = JSON.parse(localStorage.getItem("Todos"))
    settodos(Todos)
  }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("Todos",JSON.stringify(todos))
  }
  
  const toggleFinished = (params) => {
    setshowFinished (!showFinished) 
  }
  

  const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    settodos(newTodos)
    saveToLS()
  }

  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    settodos(newTodos)
    saveToLS()
    
  }

  const handleAdd = ()=>{
    let t = 'todo'
    settodos([...todos, {id:uuidv4(),todo,isCompleted: false}])
    console.log(todos)
    saveToLS()
    settodo("")
    
  }

  const handleChange = (e)=>{
    settodo(e.target.value)
  }

  const handleCheckbox = (e)=>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id == id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)

    saveToLS()
  }
  return (
    <>
      <Navbar/>
      <div className="mx-3 md:conatainer bg-violet-100 md:mx-auto p-5 my-5 rounded-xl min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'>iTask- Manage your todos at one place</h1>
          <h1 className="font-bold text-lg">Add a todo</h1>
        <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className="w-full m-2 rounded-full p-2" />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-900 text-white  px-3 mt-2 h-10 rounded-md text-sm hover:font-bold hover:bg-violet-950 disabled:bg-violet-400">Save</button>
        </div>

        <input onChange={toggleFinished} type='checkbox' checked={showFinished} className='mt-14 '/>Show Finished
        <h2  className="text-lg font-bold ">Your Todos</h2>
        
        <div className="todos">
        {todos.length=== 0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item=>{
          return (showFinished || !item.isCompleted) && 
            <div key={item.id} className="todo flex md:gap-9 m-3 justify-between md:w-1/2">
            <div className="flex gap-5">
            <input name={item.id} onChange={handleCheckbox} type="checkbox" value ={item.isCompleted} checked={item.isCompleted}/>
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e,item.id)}} className="bg-violet-900 text-white ml-3 text-lg px-2 py-1 rounded-md hover:font-bold hover:bg-violet-950"><CiEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className="bg-violet-900 text-white ml-3 text-lg px-2 py-1 rounded-md hover:font-bold hover:bg-violet-950"><MdDelete /></button>
            </div>
          </div>
           })}
        </div>
      </div>
    </>
  )
}

export default App
