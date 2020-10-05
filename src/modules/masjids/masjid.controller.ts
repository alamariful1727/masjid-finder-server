import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import { ICreateMasjidRequest, IGetAllNearByMasjidsRequest } from './masjid.dto';
import { MasjidModel, IMasjid } from './masjid.model';

export const createMasjid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { name, contactNo, address, longitude, latitude }: ICreateMasjidRequest = req.body;

    let location: IMasjid['location'] = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const newMasjid = new MasjidModel({ name, contactNo, address, location });

    const masjid = await newMasjid.save();

    return res.status(HttpStatus.CREATED).json({
      masjid,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMasjids = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const masjids = await MasjidModel.find({});
    return res.status(HttpStatus.OK).json({
      count: masjids.length,
      masjids,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNearByMasjids = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let queryData: any = req.query;
    let { longitude, latitude, maxDistance } = queryData as IGetAllNearByMasjidsRequest;

    const masjids = await MasjidModel.find({
      location: {
        $near: {
          $maxDistance: maxDistance,
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
        },
      },
    });

    return res.status(HttpStatus.OK).json({
      count: masjids.length,
      masjids,
    });
  } catch (error) {
    next(error);
  }
};
