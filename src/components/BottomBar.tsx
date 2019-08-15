import React from "react"
import { BlurView } from "expo-blur"
import styled from "../application/theme"
import { Image } from "react-native"
import { useRoute, useAppState } from "../lib/hooks/useAppContext"
import Text from "../components/styled/Text"
import NewCost from "../screens/NewCost"
import { isIphoneX } from "../lib/helpers"

function BottomBar() {
  const { routes, setRoute } = useRoute()
  const { house } = useAppState()

  return (
    <StyledBottomBar isIphoneX={isIphoneX()} tint="default" intensity={100}>
      <StyledTab
        activeOpacity={0.8}
        onPress={() => setRoute({ type: "route", route: "BALANCE" })}
      >
        <Image
          source={require("../assets/images/icon-balance.png")}
          style={{ width: 30, height: 30 }}
        />
        <StyledTabText active={routes.currentRoute === "BALANCE"}>
          Balance
        </StyledTabText>
      </StyledTab>
      {house && (
        <StyledTab
          activeOpacity={0.8}
          onPress={() => setRoute({ type: "route", route: "COSTS" })}
        >
          <Image
            source={require("../assets/images/icon-costs.png")}
            style={{ width: 30, height: 30 }}
          />
          <StyledTabText active={routes.currentRoute === "COSTS"}>
            Costs
          </StyledTabText>
        </StyledTab>
      )}
      <StyledTab
        activeOpacity={0.8}
        onPress={() => setRoute({ type: "route", route: "SETTINGS" })}
      >
        <Image
          source={require("../assets/images/icon-settings.png")}
          style={{ width: 30, height: 30 }}
        />
        <StyledTabText active={routes.currentRoute === "SETTINGS"}>
          Settings
        </StyledTabText>
      </StyledTab>
      {house && (
        <StyledTab
          activeOpacity={0.8}
          onPress={() => setRoute({ type: "modal", modal: "NEW_COST" })}
        >
          <Image
            source={require("../assets/images/icon-plus.png")}
            style={{ width: 70, height: 70 }}
          />
        </StyledTab>
      )}
      {house && <NewCost modalOpen={routes.modal === "NEW_COST"} />}
    </StyledBottomBar>
  )
}

const StyledBottomBar = styled(BlurView)<{ isIphoneX: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  flex-direction: row;
  background-color: white;
  ${p => p.theme.flexAround};

  padding-bottom: ${p => (p.isIphoneX ? p.theme.paddingL : 0)};
`

const StyledTab = styled.TouchableOpacity`
  flex: 1;
  ${p => p.theme.flexCenter};
  flex-direction: column;
`

const StyledTabText = styled(Text)<{ active: boolean }>`
  color: ${p => (p.active ? p.theme.colorText : p.theme.colorTertiary)};
`

export default BottomBar
