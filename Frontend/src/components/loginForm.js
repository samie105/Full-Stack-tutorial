import { faList12 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/userContext";

const Login = () => {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    const id = toast.loading("Logging in", {
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
        margin: "0px auto",
        backgroundColor: "white",
        color: "#00050",
      },
    });

    e.preventDefault();
    const response = await fetch(
      "https://todo-app-pu0f.onrender.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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
        render: "Logged in successfully",
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
          margin: "10px auto",
          backgroundColor: "white",
          color: "#00050",
        },
        autoClose: 1000,
        hideProgressBar: true,
      });

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return (
    <>
      <div className="mx-3 my-9 shadow-md p-4 rounded-md">
        <form onSubmit={handleLogin}>
          <div
            className="form-title font-bold mb-9 bg-red-50 py-4 px-4 rounded-md"
            style={{ background: "#dad7cd60" }}
          >
            <span className="pr-3">
              <FontAwesomeIcon icon={faList12} />
            </span>
            Todo's A'Waiting
          </div>
          <div className="username-input w-full my-2">
            <div className="my-2 font-bold text-sm text-gray-500 ">
              Username
            </div>
            <input
              value={username}
              onChange={(e) => setUser(e.target.value)}
              className="capitalize w-full h-10 rounded-md p-4 focus:outline-none font-bold"
              type="text"
              style={{ background: "#a3b18a" }}
            />
          </div>
          <div className="password-input w-full my-2">
            <div className="my-2 font-bold text-sm text-gray-500">Password</div>
            <input
              value={password}
              onChange={(e) => setPass(e.target.value)}
              className="w-full h-10 rounded-md p-4 focus:outline-none font-bold"
              type="password"
              style={{ background: "#a3b18a" }}
            />
          </div>
          <div className="btn w-full mt-8 mb-4">
            <button
              style={{ backgroundColor: "#344e41" }}
              className="w-full text-gray-200 py-3 rounded-md font-bold"
            >
              Let's go
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
