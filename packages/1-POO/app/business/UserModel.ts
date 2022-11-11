import { User } from "./models/User"

/**
 * User Model Used in the business logic ? should we move the validator here in the setXXX methode ?
 */
class UserModel {
    // keep the attributs immutable
    private userName: string
    private email: string

    constructor(user: User) {
        this.userName = user.userName
        this.email = user.email
    }

    /**
     * setUserName change the userName value
     * Only the public methods can change the attributs of the instance
     * @param {string} userName
     * @return {void}
     */
    public setUserName(userName: string) {
        this.userName = userName
    }

    /**
     * setUEmail change the email value
     * @param {string} email
     * @return {void}
     */
    public setEmail(userName: string) {
        this.email = this.email
    }
}

export default UserModel
