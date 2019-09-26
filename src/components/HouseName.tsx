import React, { useState, memo } from "react"
import { useEditHouse, HouseFragment } from "../lib/graphql"

import styled from "../application/theme"

interface HouseNameProps {
  house: HouseFragment
}

function HouseName({ house }: HouseNameProps) {
  const [houseName, setHouseName] = useState<string>(house.name)
  const [updateHouse] = useEditHouse()

  const handleHouseUpdate = (e: any) => {
    e.preventDefault()
    if (!houseName) return setHouseName(house.name)
    updateHouse({
      variables: {
        houseId: house.id,
        data: {
          currency: house.currency,
          name: houseName,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        editHouse: {
          ...house,
          name: houseName,
        },
      },
    })
  }
  return (
    <StyledInput
      value={houseName}
      blurOnSubmit={true}
      onChangeText={text => setHouseName(text)}
      onSubmitEditing={handleHouseUpdate}
      returnKeyType="done"
    />
  )
}

export default memo(HouseName)

const StyledInput = styled.TextInput`
  width: 100%;
  border: 0;
  padding: 0;
  background-color: transparent;
  color: ${p => p.theme.colorText};
  font-size: ${p => p.theme.textXL};
  font-family: ${p => p.theme.fontFamilyHeader};
  font-weight: ${p => p.theme.fontBold};
`
