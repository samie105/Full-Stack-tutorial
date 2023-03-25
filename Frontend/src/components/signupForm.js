import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/userContext";

const SignupForm = () => {
  const [username, setUser] = useState("");
  const { dispatch } = useContext(AuthContext);
  const [password, setPass] = useState("");

  const handleSignup = async (e) => {
    const id = toast.loading("Signing Up", {
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

    e.preventDefault();
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
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
        render: "Signed up successfully",
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

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return (
    <>
      <div className="mx-3 my-9 shadow-md p-4 rounded-md">
        <form onSubmit={handleSignup}>
          <div
            className="form-title font-bold mb-9 bg-red-50 px-2 rounded-md py-4 "
            style={{ background: "#dad7cd60" }}
          >
            <span className="pr-3">
              <FontAwesomeIcon icon={faShoppingBasket} />
            </span>
            Start a planned day
          </div>
          <div className="username-input w-full my-2">
            <div className="my-2 font-bold text-sm text-gray-500">Username</div>
            <input
              value={username}
              onChange={(e) => setUser(e.target.value)}
              className="font-semibold capitalize w-full h-10 rounded-md p-4 focus:outline-none"
              type="text"
              style={{ background: "#a3b18a" }}
            />
          </div>
          <div className="password-input w-full my-2">
            <div className="my-2 font-bold text-sm text-gray-500">Password</div>
            <input
              value={password}
              onChange={(e) => setPass(e.target.value)}
              className="font-semibold w-full h-10 rounded-md p-4 focus:outline-none"
              type="password"
              style={{ background: "#a3b18a" }}
            />
          </div>
          <div className="btn w-full mt-8 mb-4">
            <button
              style={{ backgroundColor: "#344e41" }}
              className="w-full text-gray-200 py-3 rounded-md font-bold"
            >
              Get Started!
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
