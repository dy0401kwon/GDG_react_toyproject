import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Mypage.css";

const MyPage = () => {
  const { themeColor, setThemeColor, profile, setProfile } =
    useContext(ThemeContext);

  const PROFILE_STORAGE_KEY = "user_profile";
  const THEME_STORAGE_KEY = "user_theme_color";

  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, themeColor);
  }, [themeColor]);

  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="mypage">
      <div className="profile-card">
        <label>이름</label>
        <input 
          type="text" 
          name="name" 
          value={profile.name} 
          onChange={onChange} 
        />

        <label>한줄 소개</label>
        <input 
          type="text" 
          name="intro" 
          value={profile.intro} 
          onChange={onChange} 
        />

        <label>테마 색상</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
          />
        </div>

        <div className="preview">
          <strong style={{ color: themeColor }}>{profile.name}</strong>
          <span>{profile.intro}</span>
        </div>
      </div>
    </div>
  );
};

export default MyPage;