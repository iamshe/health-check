const fastify = require('fastify')({
    logger: true
})
const app = fastify;

const PropertiesReader = require('properties-reader');
const property = PropertiesReader('./app.properties');

getProperty = (prop) => {return property.get(prop);}

// var gcpconnection = require('./gcpconnection')
// gcpconnection.connectGCP(getProperty('gcp.project.id'), getProperty('gcp_log_file'))


var cron = require('node-cron');
cron.schedule('*/1 * * * *', () => {
    var dbconnection = require('./dbconnection')
    dbconnection;
});




