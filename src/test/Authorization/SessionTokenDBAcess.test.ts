import { SessionTokenDBAccess } from "../../app/Authorization/SessionTokenDBAccess";
import * as Nedb from "nedb";
import { SessionToken } from "../../app/Models/ServerModels";
jest.mock("nedb");

describe("SessionTokenDBAcess test suite", () => {
  let sessionTokenDBAccess: SessionTokenDBAccess;

  const nedbMock = {
    loadDatabase: jest.fn(),
    insert: jest.fn(),
    find: jest.fn(),
  };

  const someToken: SessionToken = {
    accessRights: [],
    expirationTime: new Date(),
    tokenId: "123",
    userName: "John",
    valid: true,
  };

  beforeEach(() => {
    sessionTokenDBAccess = new SessionTokenDBAccess(nedbMock as any);
    expect(nedbMock.loadDatabase).toBeCalled();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("store sessionToken without error", async () => {
    nedbMock.insert.mockImplementationOnce((someToken: any, cb: any) => {
      cb();
    });
    await sessionTokenDBAccess.storeSessionToken(someToken);
    expect(nedbMock.insert).toBeCalledWith(someToken, expect.any(Function));
  });
  test("store sessionToken with error", async () => {
    nedbMock.insert.mockImplementationOnce((someToken: any, cb: any) => {
      cb(new Error("something went wrong"));
    });
    await expect(
      sessionTokenDBAccess.storeSessionToken(someToken)
    ).rejects.toThrow("something went wrong");
    expect(nedbMock.insert).toBeCalledWith(someToken, expect.any(Function));
  });
});
