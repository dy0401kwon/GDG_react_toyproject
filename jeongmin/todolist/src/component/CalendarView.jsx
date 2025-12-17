import { useMemo, useState } from "react";
import "./CalendarView.css";

function pad2(n) {
  return String(n).padStart(2, "0");
}
function ymdKey(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}
function sameYMD(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarView({ selectedDate, onSelectDate }) {
  const [current, setCurrent] = useState(() => selectedDate ?? new Date());

  const year = current.getFullYear();
  const month = current.getMonth(); // 0~11

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 월요일 시작(월~일)
  const firstDowMon0 = (firstDay.getDay() + 6) % 7;
  const totalCells = Math.ceil((firstDowMon0 + lastDay.getDate()) / 7) * 7;

  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - firstDowMon0 + 1;
      const date = new Date(year, month, dayNum);
      const inMonth = date.getMonth() === month;
      arr.push({ date, inMonth });
    }
    return arr;
  }, [year, month, totalCells, firstDowMon0]);

  const goPrev = () => setCurrent(new Date(year, month - 1, 1));
  const goNext = () => setCurrent(new Date(year, month + 1, 1));

  return (
    <div className="calWrap">
      <div className="calHeader">
        <div className="calYM">
          {year}년 {month + 1}월
        </div>
        <div className="calNav">
          <button className="calBtn" onClick={goPrev} type="button">‹</button>
          <button className="calBtn" onClick={goNext} type="button">›</button>
        </div>
      </div>

      <div className="calWeek">
        <div>월</div><div>화</div><div>수</div><div>목</div><div>금</div>
        <div className="sat">토</div>
        <div className="sun">일</div>
      </div>

      <div className="calGrid">
        {days.map(({ date, inMonth }) => {
          const isSelected = selectedDate && sameYMD(date, selectedDate);
          const isSat = date.getDay() === 6;
          const isSun = date.getDay() === 0;

          return (
            <button
              key={ymdKey(date)}
              className={[
                "calDay",
                inMonth ? "inMonth" : "outMonth",
                isSelected ? "selected" : "",
                isSat ? "sat" : "",
                isSun ? "sun" : "",
              ].join(" ")}
              onClick={() => onSelectDate(date)}
              type="button"
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}