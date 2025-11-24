import React, { useEffect, useState, ReactElement } from "react";
import axios from "axios";

type Task = {
  _id: string;
  task: string;
};

const App = (): ReactElement => {
  const [value, setValue] = useState<string>("");
  const [list, setList] = useState<Task[]>([]);

  async function importData(): Promise<void> {
    try {
      const response = await axios.get<Task[]>(
        "http://localhost:5000/api/tasks"
      );
      setList(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error", error.message);
      } else {
        console.log("Unknown error");
      }
    }
  }
  useEffect(() => {
    importData();
  }, []);

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
      importData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error", error.message);
      } else {
        console.log("Unknown error");
      }
    }
  }

  async function handleDelete(_id: string): Promise<void> {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${_id}`);
      importData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error:", error.message);
      } else {
        console.log("Unknown error happened");
      }
    }
  }

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
              <li key={item._id} className="font-medium  rounded-xl">
                <div className="flex justify-between items-center mb-3 p-3 bg-white rounded-lg">
                  {item.task}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-700 w-[30%]"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
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
