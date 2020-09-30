# Event Locator - server

It's an REST-API Server for storing Geographic Document in MongoDB.

## Prerequisites

You should install `Node` & `MongoDB`

### **Geographic Document**

Storing a Point in a MongoDB Document requires the field to have a name. In our case it is called location, which is itself a document with two other fields:

- **type**: One of the GeoJSON geographic types... in our case, a Point.
- **coordinates**: An array of two decimal numbers. The first is the longitude and the second is the latitude.

```javascript
{
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
    }
}
```

### **GeoSpatial Indexes**

**2dsphere** indexes support queries that calculate geometries on an earth-like sphere.

```javascript
eventSchema.index({ location: '2dsphere' });
```

### **Validating Schema using @hapi/joi Validation**

This schema validation requires that the longitude, latitude and maxDistance fields exists.

- longitude between -180 and 180
- latitude between -90 and 90
- maxDistance between 1000 and 100000

```javascript
// @hapi/joi schema
const schema = {
  ... ,
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
  maxDistance: Joi.number().min(1000).max(100000),
};
```

### **Querying Nearby Points**

By applying a `$near` filter on the location field, we can find all points within `1km` (1000 meters) of `[90.3685011, 23.7688734]`.

```javascript
const events = await EventModel.find({
  location: {
    $near: {
      $maxDistance: 1000,
      $geometry: { type: 'Point', coordinates: [90.3685011, 23.7688734] },
    },
  },
});
```

## Installing

- `git clone https://github.com/alamariful1727/event-locator.git`
- `cd event-locator`
- `npm install`

## For development

- `npm run dev`

## For production

- `npm run build`
- `npm start`

## Authors

- **Ariful Alam** - _Full Stack Developer_
