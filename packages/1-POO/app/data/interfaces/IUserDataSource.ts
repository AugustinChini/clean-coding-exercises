import { User } from "../../business/models/user"

interface IUserDataSource {
    create: (user: User) => Promise<void>
    list: () => Promise<Array<User>>
    getByUserName: (userName: string) => Promise<User | undefined>
}

export default IUserDataSource
