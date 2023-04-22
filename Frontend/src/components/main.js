import { useContext, useEffect } from "react";
import { todosContext } from "../contexts/todosContext";
import { AuthContext } from "../contexts/userContext";
import DeleteTodo from "./DeleteTodo";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBezierCurve } from "@fortawesome/free-solid-svg-icons";
const Bodymain = ({ toast }) => {
  const { user } = useContext(AuthContext);
  const { todos, dispatch } = useContext(todosContext);

  useEffect(() => {
    const fetchtodos = async () => {
      const response = await fetch(
        "https://todo-app-pu0f.onrender.com/api/todos/",
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      const json = await response.json();

      if (response.ok) dispatch({ type: "SET_TODOS", payload: json });
    };
    if (user) fetchtodos();
  }, [dispatch, user]);

  return (
    <>
      {
        <div className="w-full ">
          <div className="todos px-2 mt-2 mx-2">
            {!todos && (
              <div className="relative h-full flex items-center justify-center">
                <div className="flex justify-between loader">
                  <div className="p-1  rounded-full bg-gray-700"></div>
                  <div className="mx-1 p-1  rounded-full bg-gray-700"></div>
                  <div className="p-1 rounded-full bg-gray-700"></div>
                </div>
              </div>
            )}
            {todos && todos.length < 1 && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="content text-center text-gray-500">
                  <div className="logo text-3xl">
                    <FontAwesomeIcon icon={faBezierCurve} />
                  </div>
                  <div className="mssg font-bold">
                    Essential plans up for adds
                  </div>
                </div>
              </div>
            )}

            <div className="todos-container">
              {todos &&
                todos.length >= 1 &&
                todos.map((todo, index) => {
                  return (
                    <div
                      className=" mb-2 todo-content flex justify-between shadow-md py-2 px-3 rounded-md my-1 font-semibold text-sm capitalize"
                      key={todo._id}
                    >
                      <div>
                        <div className="todo-name font-bold">{todo.name}</div>
                        <div className="tracking-wider opacity-90 todo-date font-normal mt-1 text-gray-200 text-sm">
                          {formatDistanceToNow(new Date(todo.createdAt), {
                            addSuffix: true,
                          }) === "less than a minute ago"
                            ? "Just now"
                            : formatDistanceToNow(new Date(todo.createdAt), {
                                addSuffix: true,
                              })}
                        </div>
                      </div>
                      <DeleteTodo todo={todo} toast={toast} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Bodymain;
