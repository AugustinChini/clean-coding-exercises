import IDatabase from "../../interfaces/IDatabase";

class MockDatabase implements IDatabase {
  private connectionString: string;
  private data = [
    {
      userName: "Jean",
      email: "jean@mail.fr",
    },
    {
      userName: "Paul",
      email: "paul@mail.fr",
    },
    {
      userName: "Pierre",
      email: "pierre@mail.fr",
    },
  ];

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  /**
   * connect Start a fake connection
   */
  public connect(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * query Run a fake query
   * @param {"list" | "create" | "byUserName"} q query type
   * @param params query params
   * @returns User list or void or null
   */
  public query(
    q: "list" | "create" | "byUserName",
    params?: string
  ): Promise<unknown> {
    if (q === "list") {
      return Promise.resolve(this.data);
    } else if (q === "create") {
      return Promise.resolve();
    } else if (q === "byUserName" && params) {
      return Promise.resolve(
        this.data.find((item) => item.userName === params)
      );
    }

    return Promise.resolve(null);
  }
}

export default MockDatabase;
