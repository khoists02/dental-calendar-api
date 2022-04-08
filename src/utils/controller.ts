import { HttpErrorResponse } from "./http.error";
import { Response, Request } from "express";
import { get } from "lodash";

export const CreateController = async (
  req: Request,
  res: Response,
  callBackFunc: Function
) => {
  try {
    const userId = get(req, "user._id");

    callBackFunc(userId);
  } catch (error) {
    const serverError = new HttpErrorResponse(500, "Server is error.");
    return serverError.showError(res);
  }
};
