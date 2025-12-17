import { useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./component/layout/Header";

import Home from "./pages/Home";
import MyPage from "./pages/MyPage/MyPage";
import HabitTracker from "./pages/Habit/HabitTracker";

import { ThemeProvider } from "./context/ThemeContext";

import "./App.css";

// reducer 함수
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state];

    case "UPDATE":
      return state.map((it) =>
        it.id === action.targetId
          ? { ...it, isDone: !it.isDone }
          : it
      );

    case "DELETE":
      return state.filter((it) => it.id !== action.targetId);

    default:
      return state;
  }
}

function App() {
  // ✅ mockTodo 제거 → 빈 배열로 시작
  const [todo, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  // CREATE (선택 날짜 기준)
  const onCreate = (content, date) => {
    if (!content.trim()) return;

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: targetDate.getTime(),
      },
    });

    idRef.current += 1;
  };

  // UPDATE
  const onUpdate = (targetId) => {
    dispatch({ type: "UPDATE", targetId });
  };

  // DELETE
  const onDelete = (targetId) => {
    dispatch({ type: "DELETE", targetId });
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  todo={todo}
                  onCreate={onCreate}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              }
            />

            <Route path="/habit" element={<HabitTracker />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;