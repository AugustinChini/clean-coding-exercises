import { User } from "../../../../business/models/User";
import IDatabase from "../../../../data/interfaces/IDatabase";
import MockDatabase from "../../../../data/mockDatabase/db/mockDatabase";
import MockUserDataSource from "../../../../data/mockDatabase/userDataSource";

describe("MockDatabase UserDataSource", () => {
  let mockDatabase: any;

  beforeAll(async () => {
    mockDatabase = {
      query: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call query with create param and empty return", async () => {
    const dataSource = new MockUserDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, "query")
      .mockImplementation(() => Promise.resolve());
    const result = await dataSource.create({
      userName: "test",
      email: "test",
    });
    expect(mockDatabase.query).toHaveBeenCalledWith("create");
    expect(result).toStrictEqual(undefined);
  });

  test("should call query with list param and return data list", async () => {
    const dataSource = new MockUserDataSource(mockDatabase);
    jest.spyOn(mockDatabase, "query").mockImplementation(() =>
      Promise.resolve([
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
      ])
    );
    const result = await dataSource.list();
    expect(mockDatabase.query).toHaveBeenCalledWith("list");
    expect(result).toStrictEqual<Array<User>>([
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
    ]);
  });
  test("should call query with byUserName param and return data", async () => {
    const dataSource = new MockUserDataSource(mockDatabase);
    jest.spyOn(mockDatabase, "query").mockImplementation(() =>
      Promise.resolve({
        userName: "Paul",
        email: "paul@mail.fr",
      })
    );
    const result = await dataSource.getByUserName("Paul");
    expect(mockDatabase.query).toHaveBeenCalledWith("byUserName", "Paul");
    expect(result).toStrictEqual<User>({
      userName: "Paul",
      email: "paul@mail.fr",
    });
  });
});
