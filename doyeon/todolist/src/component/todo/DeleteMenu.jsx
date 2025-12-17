import { useState, useEffect, useRef } from "react";
import "./DeleteMenu.css";

const DeleteMenu = ({ onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <div className="delete-menu" ref={ref}>
      <button className="more-btn" onClick={toggleMenu}>
        ⋯
      </button>

      {open && (
        <div className="delete-popup" onClick={(e) => e.stopPropagation()}>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setOpen(false);
            }}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteMenu;