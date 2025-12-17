import "./TodoItem.css";

const TodoItem = ({ id, content, isDone, createdDate, onUpdate, onDelete }) => {

    const onChangeCheckbox = () => {
        onUpdate(id);
    };

    const onClickDelete = () => {
        onDelete(id);
    };

    return (
        <div className="todo-item">
        <div className="todo-left">
            <input 
            type="checkbox" 
            onChange={onChangeCheckbox} 
            checked={isDone} 
            />
            <span className="todo-text">{content}</span>
        </div>

        <div className="todo-right">
            <span className="todo-date">
            {new Date(createdDate).toLocaleDateString()}
            </span>
            <button className="delete-btn" onClick={onClickDelete}>삭제</button>
        </div>
        </div>
    );
};

export default TodoItem;