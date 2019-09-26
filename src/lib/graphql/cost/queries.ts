import gql from "graphql-tag"
import { Cost, Shares, Payer } from "./fragments"

export const GET_ALL_COSTS = gql`
  query AllCosts($groupId: String!, $search: String, $skip: Int) {
    allCosts(groupId: $groupId, search: $search, skip: $skip) {
      costs {
        ...Cost
        ...Payer
      }
      count
    }
  }
  ${Cost}
  ${Payer}
`

export const GET_COST = gql`
  query GetCost($costId: String!) {
    getCost(costId: $costId) {
      ...Cost
      ...Shares
    }
  }
  ${Cost}
  ${Shares}
`

export const CREATE_COST = gql`
  mutation CreateCost($data: CostInput!) {
    createCost(data: $data) {
      ...Cost
      ...Payer
    }
  }
  ${Cost}
  ${Payer}
`

export const EDIT_COST = gql`
  mutation EditCost($costId: String!, $data: CostInput!) {
    editCost(costId: $costId, data: $data) {
      ...Cost
      ...Shares
    }
  }
  ${Cost}
  ${Shares}
`

export const DESTROY_COST = gql`
  mutation DestroyCost($costId: String!) {
    destroyCost(costId: $costId)
  }
`
