import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import { ICreateEventRequest, IGetAllNearByEventsRequest } from './event.dto';
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

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await EventModel.find({});
    return res.status(HttpStatus.OK).json({
      count: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNearByEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let queryData: any = req.query;
    let { longitude, latitude, maxDistance } = queryData as IGetAllNearByEventsRequest;

    const events = await EventModel.find({
      location: {
        $near: {
          $maxDistance: maxDistance,
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
        },
      },
    });

    return res.status(HttpStatus.OK).json({
      count: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};
