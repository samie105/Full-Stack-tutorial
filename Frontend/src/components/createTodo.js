import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { todosContext } from "../contexts/todosContext";
import { AuthContext } from "../contexts/userContext";

const CreateNew = () => {
  const { dispatch } = useContext(todosContext);
  const { user } = useContext(AuthContext);
  const [name, setTodoname] = useState("");
  const [complete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const id = toast.loading("Adding to do", {
      position: "top-center",
      autoClose: 1000,

      closeButton: false,
      hideProgressBar: true,
      toastId: "loadingToast",
      style: {
        borderRadius: "8px",
        width: "70%",
        padding: "10px",
        fontSize: "14px",
        margin: "0 auto",
        backgroundColor: "white",
        color: "#00050",
      },
    });
    console.log(user.token);
    const tdc = { name, complete };
    const response = await fetch(
      "https://todo-app-pu0f.onrender.com/api/todos",
      {
        method: "POST",
        body: JSON.stringify(tdc),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    setIsLoading(false);
    if (!response.ok) {
      toast.update(id, {
        render: json.error,
        type: "error",
        isLoading: false,
        position: "top-center",
        closeButton: false,
        toastId: "successToast",
        style: {
          borderRadius: "8px",
          width: "70%",
          padding: "10px",
          fontSize: "14px",
          margin: "10px auto",
          backgroundColor: "white",
          color: "#00050",
        },
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
    if (response.ok) {
      setTodoname("");
      dispatch({ type: "CREATE_TODOS", payload: json });
      toast.update(id, {
        render: "New to-do added",
        type: "success",
        isLoading: false,
        position: "top-center",
        closeButton: false,
        toastId: "successToast",
        style: {
          borderRadius: "8px",
          width: "70%",
          padding: "10px",
          fontSize: "14px",
          margin: "0 auto",
          backgroundColor: "white",
          color: "#00050",
        },
        autoClose: 3000,
        hideProgressBar: true,
      });
    }

    if (!user) {
      toast.update(id, {
        render: "Please login to create a new todo",
        type: "error",
        isLoading: false,
        position: "top-center",
        closeButton: false,
        toastId: "successToast",
        style: {
          borderRadius: "8px",
          width: "70%",
          padding: "10px",
          fontSize: "14px",
          margin: "0 auto",
          backgroundColor: "white",
          color: "#00050",
        },
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }
  };

  return (
    <div className="Create-todo w-full mt-4 absolute bottom-0 mb-4">
      <form className="mx-3" onSubmit={handleSubmit}>
        <input
          style={{ background: "#a3b18a", color: "#344e41" }}
          value={name}
          onChange={(e) => setTodoname(e.target.value)}
          type="text"
          placeholder="got a plan today?"
          className="focus:outline-none placeholder:text-gray-200 w-full font-semibold capitalize h-11 p-4 my-3 rounded-md text-sm"
        />
        <button
          className=" relative w-full p-2 mb-2 rounded-md font-bold text-sm text-white"
          style={{ backgroundColor: "#344e41" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="relative h-full flex items-center justify-center py-2.5">
              <div className="flex justify-between loader">
                <div className="p-1  rounded-full bg-white"></div>
                <div className="mx-1 p-1  rounded-full bg-white"></div>
              </div>
            </div>
          ) : (
            <div className="py-1">Let's Do</div>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
