import IUserDataSource from "../data/interfaces/IUserDataSource"
import { User } from "./models/user"
import UserValidator from "./validators/userValidator"

/**
 * User business logic
 * Here I have chosen to not use the clean archi naming rules
 * because I prefere to focus on the programmation paradigm
 * and I do not understand this architecture enough to use it
 */
class UserBusiness {
    // keep the attributs immutable
    private dataSource: IUserDataSource

    constructor(dataSource: IUserDataSource) {
        this.dataSource = dataSource
    }

    /**
     * createUser Create a new user and check if all the given
     * fields are correct
     * @param {User} user the user to create
     * @return {void}
     */
    public async create(user: User) {
        const uservalidator = new UserValidator(this.dataSource)
        const validationResult = await uservalidator.validateCreate(user)
        if (validationResult.hasError) {
            throw Error(validationResult.message)
        }
        await this.dataSource.create(user)
        return
    }

    /**
     * getAll Get all the customers
     * @return {Array<User>} Customer list
     */
    public async getAll() {
        return this.dataSource.list()
    }
}

export default UserBusiness
