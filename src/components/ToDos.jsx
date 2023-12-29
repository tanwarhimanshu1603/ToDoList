import React from "react";
import Todo from "./Todo";
import EmptyTodo from './EmptyToDo'

const ToDos = ({todoList,onTodoStatusChange,onTodoDeletion,onTodoEdit}) => {

  return (
    <div className="flex flex-col items-center justify-center my-2 rounded-lg bg-[#ecedf6]">
      {
        todoList.length ? todoList.map(todo => <Todo key={todo.id} {...todo} onStatusChange={onTodoStatusChange} onDeletion={onTodoDeletion} onEdition={onTodoEdit}/>)
        : <EmptyTodo />
      }
    </div>
  );
};

export default ToDos;
