import validator from "validator";
import IUserDataSource from "../../data/interfaces/IUserDataSource";
import { User } from "../models/user";
import { ValidationResult } from "../models/ValidationResult";

class UserValidator {
  private dataSource: IUserDataSource;

  constructor(dataSource: IUserDataSource) {
    this.dataSource = dataSource;
  }

  /**
   * validateCreate Perform different validation on the user object before its creation
   * Should I test the validator or test the bahavior of the business ?
   * @param {User} user object to validate
   * @return {Promise<ValidationResult>} object which contain the validation result
   */
  public async validateCreate(user: User): Promise<ValidationResult> {
    const result: ValidationResult = {
      hasError: false,
    };
    // check email
    if (!validator.isEmail(user.email)) {
      return {
        hasError: true,
        message: "Invalid Email Format",
      };
    }
    // check user name
    if (!validator.isLength(user.userName, { min: 3, max: 25 })) {
      return {
        hasError: true,
        message: "Invalid user name",
      };
    }
    // check if the user exist
    const queryResult = await this.dataSource.getByUserName(user.userName);
    if (queryResult)
      return {
        hasError: true,
        message: "User already exist",
      };

    return result;
  }
}

export default UserValidator;
