import { useState, useRef, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./TodoEditor.css";

const TodoEditor = ({ onCreate, date }) => {
  const [content, setContent] = useState("");
  const inputRef = useRef();
  const { themeColor } = useContext(ThemeContext);

  const onSubmit = () => {
    if (!content.trim()) {
      inputRef.current.focus();
      return;
    }
    onCreate(content.trim(), date);
    setContent("");
  };

  return (
    <div className="todo-editor-card">

      <div className="editor-row">
        <input
          ref={inputRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="새로운 Todo..."
        />

        <button
          style={{ backgroundColor: themeColor }}
          onClick={onSubmit}
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default TodoEditor;