import * as styledComponents from "styled-components/native"
import { darken, lighten } from "polished"
import { Platform } from "react-native"

const theme: (isDark: boolean) => ThemeInterface = isDark => ({
  colorGrey: isDark ? "#3D3D43" : "#f8f9fd",
  colorShadow: isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(200, 200, 200, 0.1)",
  colorLabel: isDark ? "#81878a" : "#b1bbc3",
  colorText: isDark ? "#ebecec" : "#1b2d41",
  colorPage: isDark ? "#333338" : "#fff",
  colorPrimary: "#F35680",
  colorSecondary: "#0085ff",
  colorTertiary: "#6f849c",
  fontBlack: 900,
  fontBold: 700,
  fontNormal: 400,
  paddingL: "20px",
  paddingM: "12px",
  paddingS: "5px",
  paddingXL: "40px",
  paddingXS: "3px",
  borderRadius: "10px",
  textL: "18px",
  textM: "16px",
  textS: "12px",
  textXL: "26px",
  fontFamilyText: Platform.OS === "ios" ? "Verdana" : "sans-serif",
  fontFamilyHeader: Platform.OS === "ios" ? "Helvetica Neue" : "Roboto",
  boxShadow: {
    shadowColor: "#777",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  `,
  flexBetween: `
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  `,
  flexAround: `
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
  `,
})

export interface ThemeInterface {
  borderRadius: string
  colorGrey: string
  colorText: string
  colorLabel: string
  colorPage: string
  colorShadow: string
  colorPrimary: string
  colorSecondary: string
  colorTertiary: string
  fontBlack: number
  fontBold: number
  fontNormal: number
  paddingL: string
  paddingM: string
  paddingS: string
  fontFamilyText: string
  fontFamilyHeader: string
  paddingXL: string
  paddingXS: string
  textL: string
  textM: string
  textS: string
  textXL: string
  boxShadow: any
  flexCenter: string
  flexBetween: string
  flexAround: string
  [key: string]: any
}

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<
  ThemeInterface
>

export { theme, css, ThemeProvider, darken, lighten }
export default styled
