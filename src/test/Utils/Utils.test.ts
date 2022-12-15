import { IncomingMessage } from "http";
import { Utils } from "../../app/Utils/Utils";

describe("Utils test suite", () => {
  test("getRequestPath valid request", () => {
    const req = {
      url: "http://localhost:8080/login",
    } as IncomingMessage;

    const resultPath = Utils.getRequestBasePath(req);
    expect(resultPath).toBe("login");
  });

  test("getRequestPath with no path name", () => {
    const req = {
      url: "http://localhost:8080",
    } as IncomingMessage;

    const resultPath = Utils.getRequestBasePath(req);
    expect(resultPath).toBeFalsy();
  });

  test("getRequestPath with no url", () => {
    const req = {
      url: "",
    } as IncomingMessage;

    const resultPath = Utils.getRequestBasePath(req);
    expect(resultPath).toBeFalsy();
  });
});
