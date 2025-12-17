import { useState, useContext, useEffect, useMemo } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import DeleteMenu from "../todo/DeleteMenu";
import "../../pages/Habit/HabitTracker.css";

const DAYS_IN_MONTH = 30;
const STORAGE_KEY = "habits_v1";

const HabitTracker = () => {
  const { themeColor } = useContext(ThemeContext);

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [color, setColor] = useState(themeColor);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    setColor(themeColor);
  }, [themeColor]);

  const monthRate = useMemo(() => {
    const total = habits.length * DAYS_IN_MONTH;
    const done = habits.reduce((s, h) => s + h.checked.length, 0);
    return total === 0 ? 0 : Math.round((done / total) * 100);
  }, [habits]);

  const addHabit = () => {
    if (!name.trim()) return;

    setHabits((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: name.trim(),
        color,
        checked: [],
      },
    ]);

    setName("");
    setColor(themeColor);
  };

  const toggleCheck = (habitId, day) => {
    const dateKey = `2025-12-${String(day).padStart(2, "0")}`;

    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId
          ? {
              ...h,
              checked: h.checked.includes(dateKey)
                ? h.checked.filter((d) => d !== dateKey)
                : [...h.checked, dateKey],
            }
          : h
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="habit-page">
      <div className="habit-container">
        <section className="month-progress">
          <div className="progress-head">
            <span>이번달 이행률</span>
            <strong style={{ color: themeColor }}>{monthRate}%</strong>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ 
                width: `${monthRate}%`, 
                backgroundColor: themeColor,
                height: "100%",
                transition: "width 0.3s ease"
              }}
            />
          </div>
        </section>

        <section className="habit-add-card">
          <input
            type="text"
            placeholder="새 습관"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="color-picker-wrapper">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <button
            className="add-btn"
            onClick={addHabit}
            style={{ backgroundColor: themeColor }}
          >
            추가
          </button>
        </section>

        <div className="habit-list">
          {habits.map((h) => (
            <div className="habit-item-card" key={h.id}>
              <div className="habit-header">
                <span className="habit-name">{h.name}</span>
                <DeleteMenu onDelete={() => deleteHabit(h.id)} />
              </div>

              <div className="habit-days">
                {Array.from({ length: DAYS_IN_MONTH }, (_, i) => {
                  const day = i + 1;
                  const key = `2025-12-${String(day).padStart(2, "0")}`;
                  const checked = h.checked.includes(key);

                  return (
                    <button
                      key={day}
                      className="day-circle"
                      style={{
                        backgroundColor: checked ? h.color : "#f0f0f0",
                        color: checked ? "#fff" : "#666",
                      }}
                      onClick={() => toggleCheck(h.id, day)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;