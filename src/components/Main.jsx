import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import ToDos from './ToDos';


// const sampleTodosList = [{
//   id: 1,
//   title: 'This is first todo',
//   status: false,
//   duration: '6:00 PM, 25/12/2023'
// },
// {
//   id: 2,
//   title: 'This is second todo',
//   status: false,
//   duration: '6:00 PM, 25/12/2023'
// },
// {
//   id: 3,
//   title: 'This is third todo',
//   status: true,
//   duration: '6:00 PM, 25/12/2023'
// },
// {
//   id: 4,
//   title: 'This is fourth todo',
//   status: false,
//   duration: '6:00 PM, 25/12/2023'
// }];

const Main = () => {

  const [todosList,setTodosList] = useState([])

  const [userViewOption,setUserViewOption] = useState('all');

  // When the page refresh get those items from the localstorage which are there in it.
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const list = storedTodos ? JSON.parse(storedTodos) : [];

    setTodosList(list);
  },[])

  // Everytime todoslist changes we have to make sure those changes also gets updated in the localstorage
  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todosList));
  },[todosList])

  const getUserSpecificTodoList = () => {
    if(userViewOption === 'incomplete'){
      return todosList.filter(todo => !todo.status)
    }else if(userViewOption === 'complete'){
      return todosList.filter(todo => todo.status)
    }
    return todosList;
  }

  const userSpecificTodoList = getUserSpecificTodoList();

  const handleTodoStatusChange = (todoId) => {
    const updatedTodosList = todosList.map(todo => {
      if(todo.id === todoId)return {...todo,status: !todo.status}

      return todo;
    })

    setTodosList(updatedTodosList);
  }

  const handleAddTask = (newTitle,newStatus,currDuration) => {
    const newTask = {
      id: todosList.length+1,
      title: newTitle,
      status: newStatus,
      duration: currDuration
    }
    const updatedTodosList = [newTask,...todosList];
    setTodosList(updatedTodosList);
  }

  const handleTodoDeletion = (todoId) => {
    const updatedTodosListAfterDeletion = todosList.filter(todo => todo.id !== todoId);
    setTodosList(updatedTodosListAfterDeletion);
  }

  const handleTodoEdit = (todoId,updatedTitle) => {
    console.log(todoId,updatedTitle);
    const updatedTodoList = todosList.map(todo => {
      if(todo.id === todoId)return {...todo,title: updatedTitle}

      return todo;
    })

    setTodosList(updatedTodoList);
  }

  return (
    // Container class
    <div className="flex flex-col items-center justify-center mx-20 ">
      {/* Header */}
      <h1 className="flex w-full text-5xl font-bold my-6 py-4 justify-center text-gray-600">
        TODO LIST
      </h1>
      {/* Todo Content Wrapper */}
      <div className="w-7/12">
        {/* Add Task */}
        <div className="flex items-center justify-between">
          <AddTask onAddTask={handleAddTask}/>
          {/* <button onClick={handleAddTask} className='bg-[#646ff0] px-4 py-2 rounded-lg text-lg hover:bg-[#848cdc] font-semibold text-white'>Add Task</button> */}
          <div className="bg-slate-200 rounded-lg px-4 py-2">
            <select onChange={(e) => setUserViewOption(e.target.value)} value={userViewOption} className=" bg-slate-200 focus:outline-none mx-1 flex items-center text-lg font-medium cursor-pointer">
              <option value="all" className=" text-lg">
                All
              </option>
              <option value="incomplete" className=" text-lg">
                Incomplete
              </option>
              <option value="complete" className="text-lg">
                Complete
              </option>
            </select>
          </div>
        </div>
        {/* Todos */}
        <ToDos todoList={userSpecificTodoList} onTodoStatusChange={handleTodoStatusChange} onTodoDeletion={handleTodoDeletion} onTodoEdit={handleTodoEdit}/>
      </div>
    </div>
  );
};

export default Main;
