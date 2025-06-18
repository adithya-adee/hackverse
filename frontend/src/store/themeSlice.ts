import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

const getSavedTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return "light";

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return "light";
};

const applyTheme = (mode: ThemeMode) => {
  if (typeof window !== 'undefined') {
    document.documentElement.setAttribute("data-theme", mode);
    document.body.className = mode;
  }
};

const initialState: ThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (typeof window !== 'undefined') {
        localStorage.setItem("theme", state.mode);
        applyTheme(state.mode);
      }
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("theme", state.mode);
        applyTheme(state.mode);
      }
    },
    initTheme(state) {
      const savedTheme = getSavedTheme();
      state.mode = savedTheme;
      applyTheme(savedTheme);
    }
  }
});

export const { toggleTheme, setTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;