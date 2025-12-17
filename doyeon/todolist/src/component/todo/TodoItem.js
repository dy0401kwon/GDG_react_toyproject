import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import DeleteMenu from "./DeleteMenu";
import "./TodoItem.css";

const TodoItem = ({ id, content, isDone, createdDate, onUpdate, onDelete }) => {
  const { themeColor } = useContext(ThemeContext);

  return (
    <div className="todo-item">
      <div className="todo-left">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onUpdate(id)}
          style={{ accentColor: themeColor }}
        />
        <span className={`todo-text ${isDone ? "done" : ""}`}>
          {content}
        </span>
      </div>

      <div className="todo-right">
        <span className="todo-date">
          {new Date(createdDate).toLocaleDateString()}
        </span>

        <DeleteMenu onDelete={() => onDelete(id)} />
      </div>
    </div>
  );
};

export default TodoItem;