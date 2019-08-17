import React, { FC } from "react"
import styled from "../../application/theme"
import { decimalCount, getCurrency } from "../../lib/helpers"
import { useTheme, useAppState } from "../../lib/hooks/useAppContext"

interface Props {
  amount: number
  onChange: (amount: string) => void
  onSubmit: () => void
}

const Amount: FC<Props> = props => {
  const { house } = useAppState()
  const { theme, isDark } = useTheme()
  return (
    <StyledInput
      placeholder={`${getCurrency(house && house.currency)}15.45`}
      keyboardType="numeric"
      blurOnSubmit={false}
      autoFocus={true}
      placeholderTextColor={theme.colorLabel}
      keyboardAppearance={isDark ? "dark" : "light"}
      value={
        props.amount
          ? `${getCurrency(house && house.currency)}${props.amount.toString()}`
          : ""
      }
      returnKeyLabel="Next"
      returnKeyType="done"
      onSubmitEditing={props.onSubmit}
      onChangeText={val => {
        try {
          let amount = val
          if (amount[0] === getCurrency(house && house.currency))
            amount = amount.split(getCurrency(house && house.currency))[1]
          if (amount.includes(",")) amount = amount.replace(",", ".")
          if (decimalCount(+amount) > 2) return
          props.onChange(amount)
        } catch (error) {
          return
        }
      }}
    />
  )
}

export default Amount

const StyledInput = styled.TextInput`
  font-size: ${p => p.theme.textXL};
  text-align: center;
  height: 200px;
  font-family: "Verdana";
  color: ${p => p.theme.colorText};
`
