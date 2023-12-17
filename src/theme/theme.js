import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  colors: {
    primary: "#1F8A70",
    secondary: "#0078D1",
    accent: "#BFDB38",
    warning: "#FFD54F",
    danger: "#FF1744"
  },
  breakpoints: {
    base: "0px",
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
  components: {
    Popover: {
      variants: {
        responsive: {
          content: { width: "unset" },
        },
      },
    },
      Modal: {
        baseStyle: {
          dialogContainer: {
            px: 2
        },
      },
    }
  }
})
