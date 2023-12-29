import React, { useState } from "react";
import Popup from "reactjs-popup";

const AddTask = ({onAddTask}) => {


  const [title,setTitle] = useState('');
  const [status,setStatus] = useState(false);
  
  const now = new Date();

  // Format the time
  const hours = now.getHours() % 12 || 12; // Get hours in 12-hour format
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure minutes are two digits
  const amPm = now.getHours() >= 12 ? 'PM' : 'AM'; // Determine if it's AM or PM

  // Format the date
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
  const day = now.getDate().toString().padStart(2, '0'); // Ensure days are two digits
  const year = now.getFullYear();

  // Create the final formatted string
  const formattedDateTime = `${hours}:${minutes} ${amPm}, ${month}/${day}/${year}`;

  const handleAddTask = () => {
    onAddTask(title,status,formattedDateTime);
    setTitle('');
    setStatus(false);
  }

  return (
    <Popup
      trigger={
        <button className="bg-[#646ff0] px-4 py-2 rounded-lg text-lg hover:bg-[#848cdc] font-semibold text-white">
          Add Task
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="w-full max-w-lg">
          <div className="bg-[#ecedf6] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <p className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Title"
              />
            </div>
            <div className="mb-6">
              <p className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </p>
              <select onChange={() => setStatus(prev => !prev)} value={status ? 'complete' : 'incomplete'} className="shadow rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => {handleAddTask(); close()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Task
              </button>
              <button
                type="button"
                onClick={() => close()}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default AddTask;
