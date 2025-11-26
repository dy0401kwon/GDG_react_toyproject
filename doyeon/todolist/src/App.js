import { useReducer, useRef } from "react";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import mockTodo from "./component/mockTodo";
import "./App.css";

// reducer 함수
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state];

    case "UPDATE":
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
      );

    case "DELETE":
      return state.filter((it) => it.id !== action.targetId);

    default:
      return state;
  }
}

function App() {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(3);

  // CREATE
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  // UPDATE (체크박스 토글)
  const onUpdate = (targetId) => {
    dispatch({ type: "UPDATE", targetId });
  };

  // DELETE
  const onDelete = (targetId) => {
    dispatch({ type: "DELETE", targetId });
  };

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;