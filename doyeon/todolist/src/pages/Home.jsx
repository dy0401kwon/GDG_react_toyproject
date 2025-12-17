import { useState } from "react";
import CalendarView from "../component/calendar/CalendarView";
import TodoEditor from "../component/todo/TodoEditor";
import TodoList from "../component/todo/TodoList";

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

const Home = ({ todo, onCreate, onUpdate, onDelete }) => {
    const [date, setDate] = useState(toDateString(Date.now()));

    const filteredTodo = todo.filter((it) => {
    const todoDate = toDateString(it.createdDate);
    return todoDate === date;
    });

    return (
    <>
        <CalendarView
        selectedDate={date}
        onChangeDate={setDate}
        todo={todo}
        />

        <div className="todo-card">
        <TodoEditor onCreate={onCreate} date={date} />

        <TodoList
            todo={filteredTodo}
            onUpdate={onUpdate}
            onDelete={onDelete}
        />
        </div>
    </>
    );
};

export default Home;