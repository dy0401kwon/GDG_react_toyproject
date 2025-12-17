import { useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ThemeContext } from "../../context/ThemeContext";
import "./CalendarView.css";

const toDateString = (time) => {
  const d = new Date(time);
  if (isNaN(d)) return null;

  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
};

const CalendarView = ({ selectedDate, onChangeDate, todo = [] }) => {
  const { themeColor } = useContext(ThemeContext);

  const todoInfoMap = todo.reduce((acc, cur) => {
    const key = toDateString(cur.createdDate);
    if (!key) return acc;

    if (!acc[key]) {
      acc[key] = { total: 0, done: 0 };
    }

    acc[key].total += 1;
    if (cur.isDone) acc[key].done += 1;

    return acc;
  }, {});

  return (
    <div
      className="calendar-wrapper"
      style={{ "--theme-color": themeColor }}
    >
      <Calendar
        locale="ko-KR"
        calendarType="gregory"
        value={new Date(selectedDate)}
        onChange={(date) => onChangeDate(toDateString(date))}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}

        formatDay={(locale, date) => date.getDate()}

        tileClassName={({ date, view }) => {
          if (view !== "month") return null;

          const key = toDateString(date);
          const info = todoInfoMap[key];

          if (key === selectedDate) return "selected-day";
          if (!info) return null;

          if (info.done === info.total) return "all-done";
          if (info.total >= 3) return "many-todo";
          return "few-todo";
        }}

        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          const key = toDateString(date);
          const info = todoInfoMap[key];

          if (!info) return null;

          if (info.done === info.total) {
            return <div className="todo-badge check">✓</div>;
          }

          return (
            <div className="todo-badge">
              {info.total}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CalendarView;