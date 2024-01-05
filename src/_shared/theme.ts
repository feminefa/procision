import { theme } from "antd";
import { type ThemeConfig } from "antd/lib";

export const AppTheme: { light: ThemeConfig; dark: ThemeConfig } = {
  light: {
    algorithm: theme.defaultAlgorithm,
    components: {
      Layout: {
        colorBgBase: "#ffffff",
        colorBgContainer: "#ffffff",
        colorBgLayout: "transparent",
        colorBgHeader: "transparent",
      },
      Menu: {
        colorBgContainer: "#ffffff",
      },

      Button: {
        colorPrimaryText: "#ff0000",
      },
      Input: {
        colorBgBase: "#ffffff",
        colorBgContainer: "#ffffff",
        borderRadius: 18,
      },
      Select: {
        colorBgContainer: "#ffffff",
        borderRadius: 18,
      },
    },
    token: {
      colorPrimary: "#F48712",
      colorText: "#000000",
      colorPrimaryText: "#000000",
      colorPrimaryBg: "#F48712",
      colorBgBase: "#f8f8f8",
      boxShadow: "0",
      fontFamily: "'Open Sans', sans-serif",
      colorBgContainer: "#F5F5F5",
    },
  },
  dark: {
    algorithm: theme.darkAlgorithm,

    components: {
      Layout: {
        colorBgBase: "#ffffff",
        colorBgContainer: "#ffffff",
      },
      Button: {
        colorPrimaryText: "#ff0000",
      },
      Input: {
        colorBgBase: "#ffffff",
        borderRadius: 10,
      },
      Select: {
        borderRadius: 20,
      },
    },
    token: {
      colorPrimary: "#F48712",
      colorSuccess: "#1C9400",
      colorError: "#FF2222",
      colorBgBase: "#161C24",
      boxShadow: "0",
      //colorText: "#FFFFFF",
      fontFamily: "'Jost', sans-serif",
      borderRadius: 6,
      colorBgContainerDisabled: "#2E323C",
      colorBorder: "rgba(255, 255, 255, 0.05)",
      colorBorderSecondary: "rgba(255, 255, 255, 0.05)",
      colorSplit: "rgba(255, 255, 255, 0.05)",
      colorBgContainer: "#22272f",
    },
  },
};
