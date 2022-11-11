import request from "supertest"
import server from "../../../app/server"
import { User } from "../../../app/business/models/user"
import UserBusiness from "../../../app/business/UserBusiness"
import UserRouter from "../../../app/routing/express/userRouter"

const user = {
    userName: "Paul",
    email: "paul@mail.fr",
}

class MockUserBusiness {
    public create(user: User): Promise<void> {
        throw new Error("Method not implemented.")
    }
    public getAll(): Promise<User[]> {
        throw new Error("Method not implemented.")
    }
}

describe("User Router", () => {
    let mockUserBusiness: UserBusiness

    beforeAll(() => {
        mockUserBusiness = new MockUserBusiness() as UserBusiness
        server.use("/user", UserRouter(mockUserBusiness))
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("GET /user", () => {
        test("should return the user list", async () => {
            jest.spyOn(mockUserBusiness, "getAll").mockImplementation(() =>
                Promise.resolve([user])
            )
            const response = await request(server).get("/user")
            expect(response.status).toBe(200)
            expect(response.body).toStrictEqual([user])
        })
    })

    describe("POST /user", () => {
        test("should return 204 with empty body", async () => {
            jest.spyOn(mockUserBusiness, "create").mockImplementation(() =>
                Promise.resolve()
            )
            const response = await request(server).post("/user").send(user)
            expect(response.status).toBe(204)
        })
        // we should use appropriate error code not 500
        test("should return 500 error message", async () => {
            // the data format doesn't matter because the Business logic has
            // already been tested right ? just reject the promise ?
            jest.spyOn(mockUserBusiness, "create").mockImplementation(() =>
                Promise.reject(Error("Msg"))
            )
            const response: any = await request(server).post("/user").send(user)
            expect(response.status).toBe(500)
            expect(response?.error?.text).toBe("Msg") // one assert per testcase ?
        })
    })
})
