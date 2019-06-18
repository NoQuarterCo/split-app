import React, { FC, Fragment } from "react"
import { ScrollView, RefreshControl } from "react-native"

import styled from "../application/theme"
import { useAppState } from "../lib/hooks/useAppContext"
import { round } from "../lib/helpers"

import Text from "../components/styled/Text"
import Page from "../components/Page"
import HouseName from "../components/HouseName"
import HouseBalance from "../components/HouseBalance"
import InviteForm from "../components/InviteForm"
import Header from "../components/styled/Header"
import Spacer from "../components/styled/Spacer"

const Balance: FC = () => {
  const { user, house, refetch } = useAppState()
  if (!house) return null

  const handleRefetchBalance = () => refetch()
  const getBalanceHeader = () => {
    if (user.balance > 0) {
      return `You are owed €${round(user.balance * 0.01)}`
    } else {
      return `You owe €${Math.abs(round(user.balance * 0.01))}`
    }
  }
  return (
    <Page>
      {house.invites.length === 0 && house.users.length === 1 ? (
        <StyledInviteWrap>
          <Header>Now invite a house mate</Header>
          <Spacer />
          <InviteForm house={house} />
        </StyledInviteWrap>
      ) : (
        <Fragment>
          <StyledHeader>
            <HouseName house={house} />
            <HouseSummary>{getBalanceHeader()}</HouseSummary>
          </StyledHeader>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={handleRefetchBalance}
              />
            }
            contentContainerStyle={{ height: "100%" }}
          >
            <HouseBalance users={house.users} />
          </ScrollView>
        </Fragment>
      )}
    </Page>
  )
}

export default Balance

const StyledHeader = styled.View`
  width: 100%;
  padding: ${p => p.theme.paddingL} 0;
`

const HouseSummary = styled(Text)`
  font-size: ${p => p.theme.textM};
  padding-top: ${p => p.theme.paddingM};
  color: ${p => p.theme.colorLabel};
`

const StyledInviteWrap = styled.View`
  height: 80%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingM};
`
