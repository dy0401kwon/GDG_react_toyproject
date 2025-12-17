import { useState, useRef } from "react";
import "./TodoEditor.css";

const TodoEditor = ({ onCreate }) => {
    const [content, setContent] = useState("");
    const inputRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    const onSubmit = () => {
        // 공백 입력 방지
        if (!content.trim()) {
        inputRef.current.focus();
        return;
        }

        onCreate(content.trim());
        setContent("");
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
        onSubmit();
        }
    };

    return (
        <div className="TodoEditor">
        <h4>새로운 Todo 작성하기 ✏</h4>

        <div className="editor_wrapper">
            <input
            ref={inputRef}
            value={content}
            onChange={onChangeContent}
            onKeyDown={onKeyDown}
            placeholder="새로운 Todo..."
            />

            <button onClick={onSubmit}>추가</button>
        </div>
        </div>
    );
    };

export default TodoEditor;