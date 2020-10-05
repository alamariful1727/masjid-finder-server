import { Document, Schema, Model, model } from 'mongoose';

interface IMasjidBase {
  name: string;
  contactNo: string;
  address: string;
  location: {
    type: 'Point';
    coordinates: number[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const masjidSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 150,
      required: true,
    },
    contactNo: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 500,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

interface IMasjidSchema extends IMasjidBase, Document {}

// ? Write your methods here

export interface IMasjid extends IMasjidSchema {
  _doc: IMasjidSchema;
  // ? add those methods here
}

//? Make sure you create index for location in 2dsphere
masjidSchema.index({ location: '2dsphere' });

export const MasjidModel: Model<IMasjid> = model<IMasjid>('Masjid', masjidSchema);
