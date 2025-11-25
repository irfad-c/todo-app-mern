import React, { useEffect, useState, ReactElement } from "react";
import axios from "axios";

type Task = {
  _id: string;
  task: string;
};

const App = (): ReactElement => {
  const [value, setValue] = useState<string>("");
  const [list, setList] = useState<Task[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

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

  function handleEdit(_id: string, currentTask: string): void {
    setEditId(_id);
    setEditValue(currentTask);
  }

  async function handleSave(id: string): Promise<void> {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        task: editValue,
      });
      setEditId(null);
      setEditValue("");
      importData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error", error.message);
      } else {
        console.log("Unknown eror happened");
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
                  {editId === item._id ? (
                    <div className="flex w-full justify-between items-center gap-3">
                      <input
                        className="border p-2 rounded-lg w-full"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded-lg"
                        onClick={() => handleSave(item._id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-3 py-1 rounded-lg"
                        onClick={() => {
                          setEditId(null);
                          setEditValue("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <span>{item.task}</span>
                  )}

                  {editId !== item._id && (
                    <div className="flex gap-4">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-700 "
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-orange-500 text-white px-3 py-1  rounded-lg font-semibold hover:bg-orange-700 "
                        onClick={() => {
                          handleEdit(item._id, item.task);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
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
