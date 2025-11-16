import React, { useEffect, useState } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

  function handleList() {
    if (!value) return;
    const newTask = {
      id: Date.now(),
      title: value,
    };
    const updatedList = [...list, newTask];
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
    setValue("");
  }
  function handleDelete(id) {
    const updatedList = list.filter((task) => task.id !== id);
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
  }

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("list"));
    if (savedList) {
      setList(savedList);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-blue-300 w-90 border border-gray-900 m-5 rounded">
        <h2 className="text-xl font-bold m-5 p-5">Todo App</h2>
        <input
          className="border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="Type here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => {
            handleList();
          }}
          className="bg-green-500 font-bold rounded m-2 p-2"
        >
          Add
        </button>
      </div>
      <div className="flex flex-col items-center bg-blue-300 w-90 border border-gray-900 m-5 rounded">
        <h2 className=" rounded text-xl font-bold m-5 p-5">Task Lists</h2>

        <ul>
          {list.map((item) => (
            <div key={item.id} className="flex items-center ">
              {" "}
              <li className="p-2 bg-slate-100 m-2">{item.title}</li>
              <button
                className="bg-red-600 p-2 rounded font-bold"
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
