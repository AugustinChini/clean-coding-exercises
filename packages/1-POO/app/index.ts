import { env } from "process"
import * as dotenv from "dotenv"
import server from "./server"
import UserBusiness from "./business/UserBusiness"
import IUserDataSource from "./data/interfaces/IUserDataSource"
import MockUserDataSource from "./data/mockDatabase/userDataSource"
import MockDatabase from "./data/mockDatabase/db/mockDatabase"
import UserRouter from "./routing/express/userRouter"

// load the env variables
dotenv.config()
// test the env vars
if (env.CONNECTION_STRING && env.PORT) {
    // Create database
    const db = new MockDatabase(env.CONNECTION_STRING)

    // Create DataSource
    const mockUserDataSource: IUserDataSource = new MockUserDataSource(db)

    // User Routes --> database / routing and Business are not coupled thanks to the dependency invertion (POO polymorphisme)
    const userMiddleware = UserRouter(new UserBusiness(mockUserDataSource))

    // add User middleware to the server
    server.use("/user", userMiddleware)

    // Listening to the upcomming queries
    server.listen(env.PORT, () => {
        console.log(`Running on port ${env.PORT}`)
    })
} else {
    console.error("Missing env variables")
}
