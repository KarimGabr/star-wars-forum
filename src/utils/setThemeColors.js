const color_palette = {
  dark: {
    theme_color_bg: "#000000",
    theme_color_text: "#ffffff",
    theme_color_1: "#670000",
    theme_color_2: "#a50000",
    theme_color_3: "#e10000",
    theme_color_4: "#ff0000",
  },
  light: {
    theme_color_bg: "#ffffff",
    theme_color_text: "#000000",
    theme_color_1: "#bff3fb",
    theme_color_2: "#9cf3ff",
    theme_color_3: "#4de9ff",
    theme_color_4: "#00dfff",
  },
};

const setThemeColors = (theme) => {
  document.documentElement.style.setProperty(
    "--theme-color-bg",
    color_palette[theme].theme_color_bg
  );
  document.documentElement.style.setProperty(
    "--theme-color-text",
    color_palette[theme].theme_color_text
  );
  document.documentElement.style.setProperty(
    "--theme-color-1",
    color_palette[theme].theme_color_1
  );
  document.documentElement.style.setProperty(
    "--theme-color-2",
    color_palette[theme].theme_color_2
  );
  document.documentElement.style.setProperty(
    "--theme-color-3",
    color_palette[theme].theme_color_3
  );
  document.documentElement.style.setProperty(
    "--theme-color-4",
    color_palette[theme].theme_color_4
  );
};

export default setThemeColors;
