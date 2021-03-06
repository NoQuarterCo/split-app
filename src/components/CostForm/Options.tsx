import React, { FC, useState, Fragment } from "react"
import {
  Platform,
  View,
  Modal,
  Picker,
  DatePickerIOS,
  DatePickerAndroid,
} from "react-native"
import dayjs from "dayjs"

import styled from "../../application/theme"
import { capitalize } from "../../lib/helpers"
import Header from "../styled/Header"
import Button from "../Button"
import Text from "../styled/Text"
import Spacer from "../styled/Spacer"
import { useTheme } from "../../lib/hooks/useAppContext"

interface Props {
  category: string
  date: string
  recurring: string
  onChange: (val: { [key: string]: string }) => void
}

const Options: FC<Props> = props => {
  const [modalOpen, setModalOpen] = useState<string>("none")
  const { theme } = useTheme()

  const handleOpenAndroidDate = async () => {
    try {
      // @ts-ignore
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: dayjs(props.date).toDate(),
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        const androidDate = `${year}-${month + 1}-${day}`
        props.onChange({ date: dayjs(androidDate).format("YYYY-MM-DD") })
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message)
    }
  }
  return (
    <Fragment>
      <StyledOptions>
        <StyledOption>
          <View>
            <Header>Category</Header>
            <StyledOptionText>{capitalize(props.category)}</StyledOptionText>
          </View>
          <StyledEditButton onPress={() => setModalOpen("Category")}>
            <StyledEditButtonText>Change</StyledEditButtonText>
          </StyledEditButton>
        </StyledOption>
        <StyledOption>
          <View>
            <Header>Date</Header>
            <StyledOptionText>
              {dayjs(props.date).format("DD-MM-YYYY")}
            </StyledOptionText>
          </View>
          <StyledEditButton
            onPress={
              Platform.OS === "android"
                ? handleOpenAndroidDate
                : () => setModalOpen("Date")
            }
          >
            <StyledEditButtonText>Change</StyledEditButtonText>
          </StyledEditButton>
        </StyledOption>
        <StyledOption>
          <View>
            <Header>Recurring</Header>
            <StyledOptionText>{capitalize(props.recurring)}</StyledOptionText>
          </View>
          <StyledEditButton onPress={() => setModalOpen("Recurring")}>
            <StyledEditButtonText>Change</StyledEditButtonText>
          </StyledEditButton>
        </StyledOption>
      </StyledOptions>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalOpen !== "none"}
      >
        <StyledModal>
          <StyledModalHeader>{modalOpen}</StyledModalHeader>
          <Spacer />
          {modalOpen === "Category" ? (
            <Picker
              itemStyle={{ color: theme.colorText }}
              selectedValue={props.category}
              onValueChange={category => props.onChange({ category })}
            >
              {[
                { value: "food", label: "Food" },
                { value: "drinks", label: "Drinks" },
                { value: "home", label: "Home Supplies" },
                { value: "work", label: "Work Supplies" },
                { value: "rent", label: "Rent" },
                { value: "travel", label: "Travel" },
                { value: "utilities", label: "Utilities" },
                { value: "other", label: "Other" },
              ].map(item => (
                <Picker.Item
                  key={item.value}
                  value={item.value}
                  label={item.label}
                />
              ))}
            </Picker>
          ) : modalOpen === "Date" ? (
            <DatePickerIOS
              onDateChange={date =>
                props.onChange({ date: dayjs(date).format("YYYY-MM-DD") })
              }
              mode="date"
              date={dayjs(props.date).toDate()}
            />
          ) : modalOpen === "Recurring" ? (
            <Picker
              itemStyle={{ color: theme.colorText }}
              selectedValue={props.recurring}
              onValueChange={recurring => props.onChange({ recurring })}
            >
              {[
                { value: "one-off", label: "One off" },
                { value: "month", label: "Monthly" },
                { value: "week", label: "Weekly" },
              ].map(item => (
                <Picker.Item
                  key={item.value}
                  value={item.value}
                  label={item.label}
                />
              ))}
            </Picker>
          ) : null}
          <Spacer />
          <Button text="Done" onPress={() => setModalOpen("none")} />
        </StyledModal>
      </Modal>
    </Fragment>
  )
}

export default Options

const StyledOptions = styled.View`
  padding: ${p => p.theme.paddingM} 0;
  ${p => p.theme.flexAround};
  flex-direction: column;
`

const StyledOption = styled.View`
  width: 100%;
  padding: ${p => p.theme.paddingL} 0;
  ${p => p.theme.flexBetween};
`

const StyledOptionText = styled(Text)`
  padding: ${p => p.theme.paddingL} 0;
  font-size: ${p => p.theme.textL};
`

const StyledEditButton = styled.TouchableOpacity``

const StyledEditButtonText = styled(Text)`
  color: ${p => p.theme.colorLabel};
`

const StyledModal = styled.View`
  height: 100%;
  padding: ${p => p.theme.paddingXL};
  padding-top: 150px;
  background-color: ${p => p.theme.colorGrey};
`

const StyledModalHeader = styled(Header)`
  font-size: ${p => p.theme.textXL};
`
