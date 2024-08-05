import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //state variables
  const [doToggle, setdoToggle] = useState(false); 
  const[allTodos, setallTodos] = useState([]); 
  const[compTodos, setcompTodos] = useState([]); 
  const[newTask, setnewTask] = useState(""); 
  const[newDesc, setnewDesc] = useState(""); 

  //add todo function
  const addTodo =()=>{
    
    if(newTask != ""){
     let newTodo = {
      task : newTask,
      description : newDesc,
    }
    setallTodos([...allTodos, newTodo]);
    localStorage.setItem("todoList",JSON.stringify([...allTodos, newTodo]));
    setnewTask("");
    setnewDesc("");
  }
   
  }

  //delete Todo function
  const deleteTodo =(idx)=>{
    const updatedTodos = [...allTodos];
    
    // Remove the item at the specified index using splice
    updatedTodos.splice(idx, 1);
    
    // Update the state with the modified array
    setallTodos(updatedTodos);
    
    // Update local storage with the modified array
    localStorage.setItem("todoList", JSON.stringify(updatedTodos));
  }

  //delete Todo function for completed section
  const deleteTodoc =(idx)=>{
    const updatedTodocs = [...compTodos];
    
    // Remove the item at the specified index using splice
    updatedTodocs.splice(idx, 1);
    
    // Update the state with the modified array
    setcompTodos(updatedTodocs);
    
    // Update local storage with the modified array
    localStorage.setItem("todocList", JSON.stringify(updatedTodocs));
  }

  //mark as done function
  const markDone = (idx)=>{
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yyyy = now.getFullYear();
    let completed = `completed on ${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;
    
    let filtered ={...allTodos[idx],time:completed}
    setcompTodos([...compTodos, filtered]);
    localStorage.setItem("todocList",JSON.stringify([...compTodos, filtered]));
    deleteTodo(idx);
  }

  //local storage
  useEffect(()=>{
    let savedList = JSON.parse(localStorage.getItem("todoList"));
    if(savedList){
      setallTodos(savedList);
    }
    let compList = JSON.parse(localStorage.getItem("todocList"));
    if(compList){
      setcompTodos(compList);
    }
  },[]);

  return (
    <>
    <h1>TO-DO LIST</h1>
  <div className='todoWrapper'>
      <div className="todoInpt">
        <div className="textInputWrapper">
        <input placeholder="Task" value= {newTask} onChange={(e)=>setnewTask(e.target.value)} type="text" className="textInput"/>
        </div>
        <div className="textInputWrapper">
        <input placeholder="Description" value= {newDesc} onChange={(e)=>setnewDesc(e.target.value)} type="text" className="textInput"/>
        </div>
      <div className='todoInputs btn'>
       <button type='button' onClick={addTodo} className='primaryButton'>ADD</button>
      </div>
    </div>
    <div className="toggle">
      <button className={`secBtn ${doToggle == false && `active`}`} onClick={()=>setdoToggle(false)}>To Do</button>
      <button className={`secBtn ${doToggle == true && `active`}`} onClick={()=>setdoToggle(true)}>Completed</button>
    </div>
    <div className="list">
      {doToggle == false && allTodos.map((item,idx)=>{
        return(
          <div className="listItem" key={idx}>
        
        <div>
          <h3>{item.task}</h3>
          <p>{item.description}</p>
          
        </div>
        <div className='btnHolder'>
          <button className="button" onClick={()=>deleteTodo(idx)}>
          <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
          </button>

          <button className="bookmarkBtn" onClick={()=>markDone(idx)}>
            <span className="IconContainer">
            <svg viewBox="0 0 384 512" height="0.9em" class="icon">
              <path
              d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
              ></path>
            </svg>
            </span>
            <p className="text">Done!</p>
          </button>

        </div>
      </div>
        )

      })}
      {doToggle == true && compTodos.map((item,idx)=>{
        return(
          <div className="listItem" key={idx}>
        
        <div>
          <h3>{item.task}</h3>
          <p>{item.description}</p>
          <p><small><i>{item.time}</i></small></p>
        </div>
        <div className='btnHolder'>
          <button className="button" onClick={()=>deleteTodoc(idx)}>
          <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
          </button>
        </div>
      </div>
        )

      })}
      
    </div>
  </div>
    </>
  )
}

export default App
