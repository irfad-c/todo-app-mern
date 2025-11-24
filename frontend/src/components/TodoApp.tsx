import React, { useEffect, useState, ReactElement } from "react";
import axios from "axios";

type Task = {
  task: string;
};

const App = (): ReactElement => {
  const [value, setValue] = useState<string>("");
  const [list, setList] = useState<Task[]>([]);

  async function handleList(): Promise<void> {
    if (!value) {
      console.log("Task is required");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/tasks", {
        task: value,
      });
      setValue("");
    } catch (error: unknown) {
      console.log("Cant send the data to backend", error.message);
    }
  }

  useEffect(() => {
    async function importData(): Promise<void> {
      try {
        const response = await axios.get<Task[]>(
          "http://localhost:5000/api/tasks"
        );
        setList(response.data);
      } catch (error: any) {
        console.log("Error fetching data from backend", error.message);
      }
    }
    importData();
  }, []);

  function handleDelete(id: number): void {
    const updatedList = list.filter((task) => task.id !== id);
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
  }

  useEffect(() => {
    const getData = localStorage.getItem("list");
    if (getData) {
      const parsedData = JSON.parse(getData) as Task[];
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
