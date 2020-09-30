import { Document, Schema, Model, model } from 'mongoose';

interface IEventBase {
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

const eventSchema: Schema = new Schema(
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

interface IEventSchema extends IEventBase, Document {}

// ? Write your methods here

export interface IEvent extends IEventSchema {
  _doc: IEventSchema;
  // ? add those methods here
}

//? Make sure you create index for location in 2dsphere
eventSchema.index({ location: '2dsphere' });

export const EventModel: Model<IEvent> = model<IEvent>('Event', eventSchema);
