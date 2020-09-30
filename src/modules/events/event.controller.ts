import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import { ICreateEventRequest } from './event.dto';

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data: ICreateEventRequest = req.body;
    // let newAccount = new AccountModel({
    //   name: data.name,
    //   email: data.email,
    //   password: data.password,
    //   contactNo: data.contactNo,
    // });
    // let account = await newAccount.save();
    return res.status(HttpStatus.CREATED).json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(HttpStatus.OK).json({
      message: 'events',
    });
  } catch (error) {
    next(error);
  }
};
