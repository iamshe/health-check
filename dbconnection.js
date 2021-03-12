const { Sequelize } = require('sequelize');
const { Logging } = require('@google-cloud/logging');
const PropertiesReader = require('properties-reader');
const gcpconnection = require('./gcpconnection')
const property = PropertiesReader('./app.properties');

getProperty = (prop) => { return property.get(prop); }

async function connectDB() {
  const sequelize = new Sequelize(getProperty('database'), getProperty('db.user'), getProperty('db.password'), {
    host: getProperty('host'),
    dialect: 'postgres'
  });

  try {
    await sequelize.authenticate();
    const health_Logs_info = await sequelize.define("health_log_info", {
      id: {
        type: Sequelize.TEXT,
        primaryKey: true
      },
      log_name: Sequelize.TEXT,
      description: Sequelize.TEXT,
      severity: Sequelize.TEXT
    });

    await sequelize.sync({ force: true });

    console.log("connected to DB");

    const [healthLogEntries] = await gcpconnection.readLogs();
    const fastify = require('fastify')({
      logger: true
    })
    const app = fastify;
    app.post('/logs', (req, res) => {
      healthLogEntries.forEach(entry => {
        const metadata = entry.metadata;
        if (metadata[metadata.payload] = "Hello, world !") {
          health_Logs_info.create({
            id: metadata.insertId.replace("..........", ""),
            log_name: metadata.logName.replace("projects/citric-scope-272114/logs/", ""),
            description: metadata[metadata.payload],
            severity: metadata.severity
          }).then(data => res.send(data));
        }
      })
    });

    app.get('/logs', (req, res) => {
      health_Logs_info.findAll().then(log => res.send(log));
    });


    app.listen(getProperty('server.port'), function (err, address) {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening on ${address}`)
    })

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}
module.exports = connectDB();