const fastify = require('fastify')({
    logger: true
})
const app = fastify;

// var gcpconnection = require('./gcpconnection')
// app.gcpconnection


var cron = require('node-cron');

cron.schedule('*/1 * * * *', () => {
    var dbconnection = require('./dbconnection')
    app.dbconnection;
});




