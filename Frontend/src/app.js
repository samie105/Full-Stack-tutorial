import Home from "./components/homepage";
import "../src/index.css";
import "./app.css";
import Navbar from "./components/navbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/loginForm";
import SignupForm from "./components/signupForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "./contexts/userContext";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  if (user) {
    toast.success("Auto Login successfull", {
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
        fontWeight: "bold",
      },
      autoClose: 1000,
      hideProgressBar: true,
    });
  }
  return (
    <div className="all-container overflow-hidden w-96 h-full md:w-2/4 lg:w-2/4 mx-auto relative">
      <header>
        <Navbar />
      </header>
      <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route
            path="/"
            element={<div>{!user ? <Navigate to="/login" /> : <Home />}</div>}
          ></Route>
          <Route
            path="/login"
            element={
              <motion.div
                initial={{ y: 400 }}
                animate={{ y: 0 }}
                // exit={{ y: 400 }}
                transition={{ duration: 0.2 }}
              >
                {!user ? <Login /> : <Navigate to="/" />}
              </motion.div>
            }
          ></Route>
          <Route
            key="/signup"
            path="/signup"
            element={
              <motion.div
                initial={{ y: 400 }}
                animate={{ y: 0 }}
                //   exit={{ y: 400 }}
                transition={{ duration: 0.2 }}
              >
                {!user ? <SignupForm /> : <Navigate to="/" />}
              </motion.div>
            }
          ></Route>
        </Routes>
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
};

export default App;
