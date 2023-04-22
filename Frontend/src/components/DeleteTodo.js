import { useContext } from "react";
import { AuthContext } from "../contexts/userContext";
import { todosContext } from "../contexts/todosContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function DeleteTodo({ todo }) {
  const { dispatch } = useContext(todosContext);
  const { user } = useContext(AuthContext);
  const handleDelete = async () => {
    const id = toast.loading("Deleting to-do", {
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
    console.log(todo._id);
    const response = await fetch(
      "https://todo-app-pu0f.onrender.com/api/todos/" + todo._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
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
          margin: "0 auto",
          backgroundColor: "white",
          color: "#00050",
        },
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
    if (response.ok) {
      toast.update(id, {
        render: "Deleted successfully",
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
        autoClose: 1000,
        hideProgressBar: true,
      });
      dispatch({ type: "DELETE_TODOS", payload: json });
    }
  };
  return (
    <button onClick={handleDelete} className="deletebtn text-white">
      <FontAwesomeIcon style={{ color: "#588157" }} icon={faListCheck} />
    </button>
  );
}

export default DeleteTodo;
