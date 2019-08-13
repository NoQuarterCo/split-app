import {
  useAllCostsQuery,
  useGetCostQuery,
  useEditCostMutation,
  useDestroyCostMutation,
  AllCostsQuery,
  AllCostsQueryVariables,
  AllCostsDocument,
  GetHouseDocument,
  useCreateCostMutation,
  CostFragment,
  QueryAllCostsArgs,
} from "../types"

export function useAllCosts(houseId: string, search: string) {
  const { data, error, loading, fetchMore } = useAllCostsQuery({
    variables: {
      houseId,
      search,
      skip: 0,
    },
  })
  const costs = (!loading && data && data.allCosts && data.allCosts.costs) || []
  const costsCount =
    (!loading && data && data.allCosts && data.allCosts.count) || 0

  const handleRefresh = () => {
    fetchMore({
      variables: { houseId, search, skip: 0 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !prev.allCosts || !fetchMoreResult.allCosts)
          return prev
        return Object.assign({}, prev, {
          allCosts: fetchMoreResult.allCosts,
        })
      },
    })
  }
  const handleFetchMore = (variables: QueryAllCostsArgs) => {
    fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !prev.allCosts || !fetchMoreResult.allCosts)
          return prev
        return Object.assign({}, prev, {
          allCosts: {
            ...prev.allCosts,
            costs: [...prev.allCosts.costs, ...fetchMoreResult.allCosts.costs],
          },
        })
      },
    })
  }
  return {
    costs,
    costsCount,
    fetchMore: handleFetchMore,
    refresh: handleRefresh,
    costsLoading: loading,
    allCostsError: error,
  }
}

export function useGetCost(costId: string) {
  const { data, error, loading } = useGetCostQuery({
    variables: { costId },
  })
  const cost = data && data.getCost
  return { cost, getCostError: error, loading }
}

export function useEditCost(houseId: string) {
  return useEditCostMutation({
    refetchQueries: [
      { query: GetHouseDocument },
      {
        query: AllCostsDocument,
        variables: { houseId, skip: 0, search: "" },
      },
    ],
    awaitRefetchQueries: true,
  })
}

export function useDestroyCost(cost?: CostFragment) {
  const costId = cost ? cost.id : ""
  return useDestroyCostMutation({
    variables: { costId },
    refetchQueries: [{ query: GetHouseDocument }],
    update: (cache, { data }) => {
      try {
        const costsData = cache.readQuery<
          AllCostsQuery,
          AllCostsQueryVariables
        >({
          query: AllCostsDocument,
          variables: { houseId: cost ? cost.houseId : "", skip: 0, search: "" },
        })
        if (
          data &&
          costsData &&
          costsData.allCosts &&
          costsData.allCosts.costs
        ) {
          const costs = costsData.allCosts.costs.filter(c => c.id !== costId)
          cache.writeQuery({
            query: AllCostsDocument,
            data: {
              allCosts: {
                __typename: costsData.allCosts.__typename,
                count: costsData.allCosts.count,
                costs,
              },
            },
            variables: {
              houseId: cost ? cost.houseId : "",
              skip: 0,
              search: "",
            },
          })
        }
      } catch {}
    },
  })
}

export function useCreateCost(houseId: string) {
  return useCreateCostMutation({
    refetchQueries: [{ query: GetHouseDocument }],
    awaitRefetchQueries: true,
    update: (cache, { data }) => {
      try {
        const costsData = cache.readQuery<
          AllCostsQuery,
          AllCostsQueryVariables
        >({
          query: AllCostsDocument,
          variables: { houseId, skip: 0, search: "" },
        })
        if (data && costsData && costsData.allCosts) {
          cache.writeQuery({
            query: AllCostsDocument,
            variables: { houseId, skip: 0, search: "" },
            data: {
              allCosts: {
                __typename: costsData.allCosts.__typename,
                count: costsData.allCosts.count,
                costs: [data.createCost, ...costsData.allCosts.costs],
              },
            },
          })
        }
      } catch {}
    },
  })
}
