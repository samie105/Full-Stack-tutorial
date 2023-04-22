import {
  faHandFist,
  faList12,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { todosContext } from "../contexts/todosContext";
import { AuthContext } from "../contexts/userContext";

const Navbar = () => {
  const counterRef = useRef(null);
  const { user, dispatch } = useContext(AuthContext);
  const { todos, dispatch: dsp } = useContext(todosContext);
  useEffect(() => {
    if (counterRef.current) {
      counterRef.current.classList.add("counter-increase");
      const animationTimeout = setTimeout(() => {
        counterRef.current.classList.remove("counter-increase");
      }, 500);
      return () => clearTimeout(animationTimeout);
    }
  }, [todos]);
  const handleClick = () => {
    toast.success("Logged out successfully", {
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
    dsp({ type: "SET_TODOS", payload: null });
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className=" mx-3 px-3 pb-3 shadow-md rounded-bl-md rounded-br-md">
      <div className="nav-container flex justify-between py-4 ">
        <Link to="/">
          <div className="font-black text-lg">Todo'er</div>
        </Link>
        <div className="flex text-sm text-md justify-center items-center font-semibold">
          {!user && (
            <NavLink to="/login">
              <div>Login</div>
            </NavLink>
          )}
          {!user && (
            <NavLink to="/signup">
              <div className="mx-2">Signup</div>
            </NavLink>
          )}
          {user && (
            <button className="" onClick={handleClick}>
              Logout
            </button>
          )}
        </div>
      </div>
      <div
        className="intro text-sm rounded-md py-4 mt-4 px-3 text-white flex justify-between"
        ref={counterRef}
        style={{ background: "#344e41" }}
      >
        {user && (
          <>
            <div className="font-semibold">
              <span className="mr-2 text-lg">
                <FontAwesomeIcon icon={faMoon} />
              </span>
              Good Evening,{" "}
              <span className="user tracking-wide font-bold capitalize">
                {user.username}
              </span>
            </div>
            <div>
              <div
                style={{ background: "#00000040" }}
                className="counter py-4 px-3 h-8 flex justify-center items-center rounded-full text-sm"
              >
                <div className="icon font-bold">
                  <FontAwesomeIcon icon={faList12} />
                </div>
                <div className="figure mx-1 font-semibold text-sm">
                  {todos == null ? "0" : todos.length}
                </div>
              </div>
            </div>
          </>
        )}{" "}
        {!user && (
          <>
            <div className="font-bold">
              <span className="mr-2 text-lg">
                <FontAwesomeIcon icon={faHandFist} />
              </span>
              Please Login or Create an account
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
