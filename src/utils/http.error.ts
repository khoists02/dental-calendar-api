import { Request, Response } from "express";

export type Error = {
  message: string;
  code: number;
};

export class HttpErrorResponse {
  errorCode: number;
  errorMessage: string;
  constructor(code: number, message: string) {
    this.errorCode = code;
    this.errorMessage = message;
  }

  showError(res: Response) {
    return res.status(this.errorCode).send({
      message: this.errorMessage,
      code: this.errorCode,
    });
  }
}

export const NotFound = (message: string, res: Response) => {
  const serverError = new HttpErrorResponse(404, message);
  return serverError.showError(res);
};

export const ServerError = (res: Response) => {
  const serverError = new HttpErrorResponse(500, "Server Error");
  return serverError.showError(res);
};

export const UnAuthorize = (res: Response) => {
  const serverError = new HttpErrorResponse(401, "Unauthorized.");
  return serverError.showError(res);
};
