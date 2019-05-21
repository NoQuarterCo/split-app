export const env = process.env.NODE_ENV || "development"

export const production = env === "production"

export const apiUrl =
  env === "production"
    ? "https://nq-split.herokuapp.com/graphql"
    : // : "http://192.168.43.77:5000/graphql"
      "http://localhost:5000/graphql"
