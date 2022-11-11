import { User } from "../../app/business/models/user"
import UserBusiness from "../../app/business/UserBusiness"
import IUserDataSource from "../../app/data/interfaces/IUserDataSource"

describe("Create User business", () => {
    class MockUserDataSource {
        create(user: User) {
            throw new Error("Method not implemented.")
        }
        list() {
            throw new Error("Method not implemented.")
        }
        getByUserName(userName: string) {
            throw new Error("Method not implemented.")
        }
    }

    let mockUserDataSource: IUserDataSource

    beforeEach(() => {
        jest.clearAllMocks()
        mockUserDataSource = new MockUserDataSource() as IUserDataSource
    })

    test("should not throw a validation error", async () => {
        const newUser = { userName: "Test", email: "test@test.com" }
        jest.spyOn(mockUserDataSource, "create").mockImplementation(() => {
            return Promise.resolve()
        })
        jest.spyOn(mockUserDataSource, "getByUserName").mockImplementation(
            () => {
                return Promise.resolve(undefined)
            }
        )
        const userBusiness = new UserBusiness(mockUserDataSource)
        await userBusiness.create(newUser)
        expect(mockUserDataSource.create).toBeCalledTimes(1)
    })
    test("should throw a email error", async () => {
        const newUser = { userName: "Test", email: "test.com" }
        jest.spyOn(mockUserDataSource, "create").mockImplementation(() => {
            return Promise.resolve()
        })
        jest.spyOn(mockUserDataSource, "getByUserName").mockImplementation(
            () => {
                return Promise.resolve(undefined)
            }
        )
        try {
            const userBusiness = new UserBusiness(mockUserDataSource)
            await userBusiness.create(newUser)
            throw Error("Should throw validation error")
        } catch (e: any) {
            expect(e?.message).toEqual("Invalid Email Format")
        }
    })
    test("should throw a userName error", async () => {
        const newUser = {
            userName: "12345678911234567892123456",
            email: "test@test.com",
        }
        jest.spyOn(mockUserDataSource, "create").mockImplementation(() => {
            return Promise.resolve()
        })
        jest.spyOn(mockUserDataSource, "getByUserName").mockImplementation(
            () => {
                return Promise.resolve(undefined)
            }
        )
        try {
            const userBusiness = new UserBusiness(mockUserDataSource)
            await userBusiness.create(newUser)
            throw Error("Should throw validation error")
        } catch (e: any) {
            expect(e?.message).toEqual("Invalid user name")
        }
    })
    test("should throw a user already exist error", async () => {
        const newUser = { userName: "Jean", email: "test@test.com" }
        jest.spyOn(mockUserDataSource, "create").mockImplementation(() => {
            return Promise.resolve()
        })
        jest.spyOn(mockUserDataSource, "getByUserName").mockImplementation(
            () => {
                return Promise.resolve({
                    userName: "Jean",
                    email: "jean@mail.fr",
                })
            }
        )
        try {
            const userBusiness = new UserBusiness(mockUserDataSource)
            await userBusiness.create(newUser)
            throw Error("Should throw validation error")
        } catch (e: any) {
            expect(e?.message).toEqual("User already exist")
        }
    })
})
