import { Document, Schema, Model, model } from 'mongoose';

interface IEventBase {
  name: string;
  contactNo: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 32,
      required: true,
    },
    contactNo: {
      type: String,
      trim: true,
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
      address: {
        type: String,
        trim: true,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

interface IEventSchema extends IEventBase, Document {}

// ? Write your methods here

export interface IEvent extends IEventSchema {
  _doc: IEventSchema;
  // ? add those methods here
}

export const EventModel: Model<IEvent> = model<IEvent>('Event', eventSchema);
