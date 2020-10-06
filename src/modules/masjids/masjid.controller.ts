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
      masjid: {
        _id: masjid._id,
        name: masjid.name,
        contactNo: masjid.contactNo,
        address: masjid.address,
        latitude: masjid.location.coordinates[1],
        longitude: masjid.location.coordinates[0],
        createdAt: masjid.createdAt,
        updatedAt: masjid.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMasjids = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const masjids = await MasjidModel.find({});
    const mappedMasjids = masjids.map(({ _id, name, contactNo, address, location, createdAt, updatedAt }) => {
      return {
        _id,
        name,
        contactNo,
        address,
        latitude: location.coordinates[1],
        longitude: location.coordinates[0],
        createdAt,
        updatedAt,
      };
    });
    return res.status(HttpStatus.OK).json({
      count: mappedMasjids.length,
      masjids: mappedMasjids,
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

    const mappedMasjids = masjids.map(({ _id, name, contactNo, address, location, createdAt, updatedAt }) => {
      return {
        _id,
        name,
        contactNo,
        address,
        latitude: location.coordinates[1],
        longitude: location.coordinates[0],
        createdAt,
        updatedAt,
      };
    });
    return res.status(HttpStatus.OK).json({
      count: mappedMasjids.length,
      masjids: mappedMasjids,
    });
  } catch (error) {
    next(error);
  }
};
