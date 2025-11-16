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
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center shadow-md bg-grey w-96 border border-gray-600 m-5 p-5 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Todo App</h2>
          <input
            className="border  p-3 rounded-lg w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            placeholder="Type here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={() => {
              handleList();
            }}
            className="bg-green-400 font-bold rounded m-2 p-2"
          >
            Add
          </button>
        </div>
        <div className="flex flex-col m-5 p-5 bg-blue-100 items-center w-96 border shadow-md mb-5 rounded">
          <h2 className=" rounded text-xl font-bold m-5 p-5">Task Lists</h2>
          <ul className="w-full">
            {list.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-3 p-3 bg-gray-100 rounded-lg"
              >
                {" "}
                <li className="text-gray-800 font-medium  rounded-xl">
                  {item.title}
                </li>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-700'"
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
      </div>
    </>
  );
};

export default App;
