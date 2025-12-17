import { useMemo, useReducer, useRef, useState } from "react";
import CalendarView from "./component/CalendarView";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import mockTodo from "./component/mockTodo";
import "./App.css";

const pad2 = (n) => String(n).padStart(2, "0");
const toYMD = (d) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

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
  const [todo, dispatch] = useReducer(
    reducer,
    mockTodo.map((t) => ({
      ...t,
      // 기존 데이터도 날짜 필드가 없을 수 있어서 보정
      date: t.date ?? toYMD(new Date(t.createdDate)),
    }))
  );

  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedKey = toYMD(selectedDate);

  const idRef = useRef(3);

  // CREATE (선택한 날짜에 추가!)
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
        date: selectedKey, // ✅ 달력에서 고른 날짜에 저장
      },
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId) => dispatch({ type: "UPDATE", targetId });
  const onDelete = (targetId) => dispatch({ type: "DELETE", targetId });

  const filteredTodo = useMemo(
    () => todo.filter((t) => (t.date ?? toYMD(new Date(t.createdDate))) === selectedKey),
    [todo, selectedKey]
  );

  return (
    <div className="App">

      <CalendarView
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <TodoEditor onCreate={onCreate} />
      <TodoList todo={filteredTodo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;