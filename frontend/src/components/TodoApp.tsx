import React, { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
};

const App = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [list, setList] = useState<Task[]>([]);

  function handleList(): void {
    if (!value) return;
    const newTask: Task = {
      id: Date.now(),
      title: value,
    };
    const updatedList = [...list, newTask];
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
    setValue("");
  }
  function handleDelete(id: number): void {
    const updatedList = list.filter((task) => task.id !== id);
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
  }

  useEffect(() => {
    const getData = localStorage.getItem("list");
    if (getData) {
      const parsedData: Task[] = JSON.parse(getData);
      setList(parsedData);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen ">
        <div className="flex flex-col items-center shadow-md bg-orange-100 w-full max-w-md border m-5 p-5 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Todo App</h2>
          <input
            className="border  p-3 rounded-lg w-full  focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            placeholder="Type here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={() => {
              handleList();
            }}
            className="bg-green-400 font-bold rounded m-2 p-2 hover:bg-green-600"
          >
            Add
          </button>
        </div>
        <div className="flex flex-col m-5 p-5 bg-blue-100 items-center w-full max-w-md  shadow-md mb-5 rounded-xl">
          <h2 className=" rounded text-xl font-bold m-5 p-5">Task Lists</h2>
          <ul className="w-full ">
            {list.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-3 p-3 bg-white rounded-lg"
              >
                {" "}
                <li className="font-medium  rounded-xl">{item.title}</li>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-700 w-[30%]"
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

/*
: void means the function returns nothing.
*/
