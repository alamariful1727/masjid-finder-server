import { IMasjid } from './masjid.model';

export interface ICreateMasjidRequest {
  name: IMasjid['name'];
  contactNo: IMasjid['contactNo'];
  address: IMasjid['address'];
  latitude: number;
  longitude: number;
}

export interface IGetAllNearByMasjidsRequest {
  maxDistance: number;
  latitude: number;
  longitude: number;
}
