import { User } from "../../business/models/user"

interface IDatabase {
    connect: () => Promise<void>
    query: (q: any, params?: any) => Promise<unknown>
}

export default IDatabase
