import { toggleTheme, useTheme } from "../lib/theme";
import { Icon } from "./Icon";

export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <Icon name={theme === "light" ? "moon" : "sun"} size={16} />
    </button>
  );
}
