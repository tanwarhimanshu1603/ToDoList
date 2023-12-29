import React, { useState } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdEdit,
  MdDelete,
  MdOutlineDownloadDone
} from "react-icons/md";

const Todo = ({id,title,duration,status,onStatusChange,onDeletion,onEdition}) => {

  const [todoTitle,setTodoTitle] = useState(title);
  const [taskStatus,setTaskStatus] = useState(status);
  const [isEditable,setIsEditable] = useState(false);

  const handleStatusChange = () => {
    setTaskStatus(prev => !prev);
    onStatusChange(id);
  }

  const handleDeletion = () => {
    // console.log(id);
    onDeletion(id);
  }

  const handleEdition = () => {
    setIsEditable(prev => !prev)
  }

  const handleUpdateTodo = () => {
    onEdition(id,todoTitle);
    setIsEditable(prev => !prev)
  }

  return (
    // Todo
    <div
      className="flex items-center w-11/12 justify-between rounded-md my-2 p-2 bg-white text-[#585858]"
    >
      {/* title and checkbox */}
      <div className="flex items-center">
        {/* Checkbox */}
        <div onClick={handleStatusChange} className="mx-1 cursor-pointer">
          {
            taskStatus ? <MdCheckBox size={25} /> : <MdCheckBoxOutlineBlank size={25} />
          }
        </div>
        {/* Title and date time */}
        <div className="flex flex-col items-start">
          <input onChange={(e) => setTodoTitle(e.target.value)} value={todoTitle} type="text" className={`bg-[#ecedf6] text-black m-1 py-1 px-2 rounded-lg w-full focus:outline-none ${!isEditable && 'hidden'}`}/>
          <p className={`font-semibold ${taskStatus && 'line-through'} ${isEditable && 'hidden'} max-w-md break-words`}>
            {title}
          </p>
          <p className="text-xs">{duration}</p>
        </div>
      </div>
      {/* Edit and delete */}
      <div className="flex items-center space-x-2">
        {/* Edit */}
        {
          isEditable ? 
          <div onClick={handleUpdateTodo} className="bg-[#dedfe1] text-slate-800 rounded p-2 cursor-pointer">
            <MdOutlineDownloadDone size={20} />  
          </div> :
          <div onClick={handleEdition} className="bg-[#dedfe1] text-slate-800 rounded p-2 cursor-pointer">
            <MdEdit size={20} /> 
          </div>
        }
        {/* Delete */}
        <div onClick={handleDeletion} className="bg-[#dedfe1] text-slate-800 rounded p-2 cursor-pointer">
          <MdDelete size={20} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
