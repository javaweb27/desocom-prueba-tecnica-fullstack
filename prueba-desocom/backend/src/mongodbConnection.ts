import { connect } from "mongoose"
import { MONGODB_URI } from "./config"

export const mongodbConnection = async () => {
  console.log("connecting to mongodb database...")

  connect(MONGODB_URI)
    .then(() => {
      console.log("mongodb connection: ok")
    })
    .catch(error => {
      console.error("mongodb failed", error)
    })
}