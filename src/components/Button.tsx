import React, { memo } from "react"
import styled, { css, ThemeInterface, lighten } from "../application/theme"
import { capitalize } from "../lib/helpers"

export type Variant = "primary" | "secondary" | "tertiary"
export type Color = "blue" | "pink" | "text"

interface ButtonProps {
  onPress: () => void
  text: string
  variant?: Variant
  color?: Color
  loading?: boolean
  disabled?: boolean
  full?: boolean
}

function Button({
  variant = "primary",
  color = "blue",
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      color={color}
      loading={loading}
      disabled={loading || disabled}
      {...props}
    >
      <StyledText color={color} variant={variant}>
        {loading ? "Loading" : props.text}
      </StyledText>
    </StyledButton>
  )
}

export default memo(Button)

const primaryStyles = (color: string) => css`
  padding: ${p => `${p.theme.paddingM} ${p.theme.paddingXL}`};
  background-color: ${p => p.theme["color" + capitalize(color)]};
`

const secondaryStyles = (color: string) => css`
  background-color: transparent;
  padding: ${p => `${p.theme.paddingM} ${p.theme.paddingXL}`};
  border: 2px solid ${p => lighten(0.25, p.theme["color" + capitalize(color)])};
`

const tertiaryStyles = () => css`
  background-color: transparent;
`

const getVariantStyles = ({
  color = "blue",
  variant = "primary",
}: ThemeInterface & ButtonProps) => {
  switch (variant) {
    case "primary":
      return primaryStyles(color)
    case "secondary":
      return secondaryStyles(color)
    case "tertiary":
      return tertiaryStyles
    default:
      return primaryStyles(color)
  }
}

const StyledButton = styled.TouchableOpacity<ButtonProps>`
  border-radius: 100px;
  margin: ${p => (p.full ? 0 : p.theme.paddingS)};
  width: ${p => (!p.full ? "auto" : "100%")};
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  ${p => getVariantStyles({ ...p, ...p.theme })}
`

const StyledText = styled.Text<{ color: Color; variant: Variant }>`
  letter-spacing: 1px;
  text-align: center;
  font-size: ${p => p.theme.textM};
  color: ${p =>
    p.variant === "primary" ? "white" : p.theme["color" + capitalize(p.color)]};
`
