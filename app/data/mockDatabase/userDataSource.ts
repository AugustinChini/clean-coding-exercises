import { User } from "../../business/models/user";
import IDatabase from "../interfaces/IDatabase";
import IUserDataSource from "../interfaces/IUserDataSource";

class MockUserDataSource implements IUserDataSource {
  private db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  /**
   * create Create a new user
   * @param user New User
   * @returns {Promise<void>}
   */
  public create(user: User): Promise<void> {
    return this.db.query("create") as Promise<void>;
  }

  /**
   * list List all the users
   * @returns {Promise<Array<User>>}
   */
  public list(): Promise<Array<User>> {
    return this.db.query("list") as Promise<Array<User>>;
  }

  /**
   * list List all the users
   * @returns {Promise<Array<User>>}
   */
  public getByUserName(userName: string): Promise<User | undefined> {
    return this.db.query("byUserName", userName) as Promise<User | undefined>;
  }
}

export default MockUserDataSource;
