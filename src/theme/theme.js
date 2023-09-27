import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  colors: {
    primary: "#1F8A70",
    secondary: "#0078D1",
    accent: "#BFDB38",
    warning: "#FFD54F",
    danger: "#FF1744"
  },
  components: {
    Popover: {
      variants: {
        responsive: {
          content: { width: "unset" },
        },
      },
    }
  }
})
