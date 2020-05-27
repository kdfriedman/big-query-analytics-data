const path = require('path');
// Imports the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
const EventEmitter = require('events');
const bgQueryEventEmitter = new EventEmitter();

// query data from Big Query
const query = `SELECT * FROM ${process.env.ANALYTICS_DATASET}.${process.env.DATALAYER_TABLE}`;

/* ROUTE HANDLER */
exports.createAnalytics = (req, res) => {
  // listen for dataLoaded event emitted after BQ results have returned
  bgQueryEventEmitter.once('dataLoaded', (...args) => {
    const eventData = args.flat(2);

    if (!eventData || eventData.length === 0) {
      res.status(201).json({
        status: 201,
        data: {},
      });
    }

    // if req markup id is === to bq row id, return data
    eventData.forEach((bqObj) => {
      if (req.body.analyticsID === bqObj.eventID) {
        res.status(201).json({
          status: 201,
          data: {
            eventData: bqObj,
          },
        });
      }
    });
  });

  bigquery
    .query(query)
    .then((data) => {
      const rows = data;

      data.forEach((row) => {
        if (row.length > 0) {
          bgQueryEventEmitter.emit('dataLoaded', rows);
        }
      });
    })
    .catch((err) => console.log(err));
};
