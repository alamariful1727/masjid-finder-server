import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import { ICreateEventRequest } from './event.dto';
import { EventModel, IEvent } from './event.model';

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { name, contactNo, address, longitude, latitude }: ICreateEventRequest = req.body;

    let location: IEvent['location'] = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const newEvent = new EventModel({ name, contactNo, address, location });

    const event = await newEvent.save();

    return res.status(HttpStatus.CREATED).json({
      event,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await EventModel.find({});
    return res.status(HttpStatus.OK).json({
      events,
    });
  } catch (error) {
    next(error);
  }
};
