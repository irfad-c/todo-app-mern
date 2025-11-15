import React, { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

  function handleList() {
    if (!value) return;

    const newTask = {
      id: Date.now(),
      title: value,
    };

    setList([...list, newTask]);
    setValue("");
  }

  return (
    <>
      <div className="flex flex-col items-center bg-blue-300 w-90 border border-gray-900 m-5 rounded">
        <h2 className="bg-red-500 rounded text-xl font-bold m-5 p-5">
          Todo App
        </h2>
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
          className="bg-green-200 rounded m-2 p-2"
        >
          Add
        </button>
      </div>
      <div className="flex flex-col items-center bg-blue-300 w-90 border border-gray-900 m-5 rounded">
        <h2 className=" rounded text-xl font-bold m-5 p-5">Task Lists</h2>

        <ul>
          {list.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
