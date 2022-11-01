import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Axios from "axios";

// current status true means it's done
// const todoListOriginal = [
//   { id: 1, todolist: "finish props practice in srimba", CurrentStatus: false },
//   { id: 2, todolist: "code review lender matching", CurrentStatus: false },
//   { id: 3, todolist: "redux for one hour", CurrentStatus: false },
// ];

function Todo() {
  // local storage

  // const [todo, setTodo] = useState(
  //   JSON.parse(window.localStorage.getItem("todo")) &&
  //     JSON.parse(window.localStorage.getItem("todo")).length > 0
  //     ? JSON.parse(window.localStorage.getItem("todo"))
  //     : todoListOriginal
  // );

  const [todo, setTodo] = useState([]);

  const [addTodo, setAddTodo] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3005/api/get").then((res) => {
      setTodo(res.data);
    });
  }, []);


//   useEffect(() => {
//     // DELETE request using axios inside useEffect React hook
//     axios.delete('https://reqres.in/api/posts/1')
//         .then(() => setStatus('Delete successful'));

// // empty dependency array means this effect will only run once (like componentDidMount in classes)
// }, []);


  const handleDelete = (e) => {
    const id = parseInt(e.target.getAttribute("name"));

    Axios.delete(`http://localhost:3005/api/delete/${id}`).then(res => {
      console.log("res", res);
      const newList = todo.filter((item) => {
        return item.id !== id;
      });
      setTodo(newList);
  })


    const newList = todo.filter((item) => {
      return item.id !== id;
    });
    setTodo(newList);
    console.log("todo list from delete", todo);
  };

  // get the clicked item and flip the condition in one value from true to false
  const handledCrossOut = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.getAttribute("name"));
    Axios.post(`http://localhost:3005/api/updateStatus/${id}`, {
      toDoName: addTodo,
      CurrentStatus: todo.CurrentStatus,
    }).then(()=>{
      const fuckingCopy = [...todo];
    // passing by reference
    const id = parseInt(e.target.getAttribute("name"));
    const objectToBeModified = fuckingCopy.find((item) => {
      return item.id === id;
    });
    //flip the condition in one value from true to false
    objectToBeModified.CurrentStatus = !objectToBeModified.CurrentStatus;
    setTodo(fuckingCopy);

    })


    // e.preventDefault();
    // const fuckingCopy = [...todo];
    // // passing by reference
    // const id = parseInt(e.target.getAttribute("name"));
    // const objectToBeModified = fuckingCopy.find((item) => {
    //   return item.id === id;
    // });
    // //flip the condition in one value from true to false
    // objectToBeModified.CurrentStatus = !objectToBeModified.CurrentStatus;
    // setTodo(fuckingCopy);
  };

  // input value
  const handleAdd = (event) => {
    //console.log(event);
    setAddTodo(`${event.target.value}`);
   
  };

  const addToDoDataBase = (event) => {
    console.log("add to do=>", addTodo);
    Axios.post("http://localhost:3005/api/insert", {
      toDoName: addTodo,
      CurrentStatus: 0,
    }).then(() => {
      setTodo((todo) => [
        ...todo,
        {
          id: parseInt(`${todo.length + 1}`),
          toDoName: addTodo,
          CurrentStatus: 0,
        },
      ]);
    });

    setAddTodo("");
  };

  // local storage
  // useEffect(() => {
  //   window.localStorage.setItem("todo", JSON.stringify(todo));
  // }, [todo]);

  return (
    <div>
      <h4 className="">Here is my todo list</h4>
      <ol style={{listStyleType: 'decimal'}}>
        {todo.map((item, i) => {
          return (
            <div className="flex flex-row gap-7 m-px justify-between" key={i}>
              {item.CurrentStatus ? (
                <li
                  name={item.id}
                  style={{textDecoration: "line-through" }}
                >
                 {item.toDoName}
                </li>
              ) : (
                <li name={item.id}>
                  {/* {item.id}: {item.toDoName} */}
                  {item.toDoName}
                </li>
              )}
              <div>
                <button
                  onClick={handledCrossOut}
                  value={item.CurrentStatus}
                  name={item.id}
                  className="bg-fuchsia-500 hover:bg-red-300 text-white py-0 px-2 rounded mr-6"
                >
                  done
                </button>
                <button
                  onClick={handleDelete}
                  name={item.id}
                  className="bg-blue-500 hover:bg-purple-300 text-white py-0 px-2 rounded"
                >
                  remove
                </button>
              </div>
            </div>
          );
        })}
      </ol>
      <div className="flex justify-center gap-6 mt-3">
        <input
          className="form-control border border-solid border-purple-300 rounded pl-3"
          onChange={handleAdd}
          placeholder="enter to do list here"
          value={addTodo}
        />
        <Button
          color="secondary"
          onClick={addToDoDataBase}
          variant="outlined"
          size="small"
        >
          add list
        </Button>
      </div>
      {todo.map((item) => {
        return <p>{item.toDoName}</p>;
      })}
    </div>
  );
}

export default Todo;
