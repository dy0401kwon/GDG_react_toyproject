import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const savedProfile = localStorage.getItem("user_profile");
    const savedColor = localStorage.getItem("user_theme_color");

    const [themeColor, setThemeColor] = useState(
        savedColor ? savedColor : "#1f93ff"
    );
    
    const [profile, setProfile] = useState(
        savedProfile ? JSON.parse(savedProfile) : { }
    );

    return (
        <ThemeContext.Provider
        value={{ themeColor, setThemeColor, profile, setProfile }}
        >
        {children}
        </ThemeContext.Provider>
    );
};