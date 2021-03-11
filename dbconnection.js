const { Sequelize } = require('sequelize');
const { Logging } = require('@google-cloud/logging');

async function connectDB() {
  const sequelize = new Sequelize('testdb', 'postgres', '1234abcd', {
    host: 'localhost',
    dialect: 'postgres'
  });

  try {

    const logging = new Logging('citric-scope-272114');
    console.log("Connected to cloud");

    var log = logging.log('log_file');
    await sequelize.authenticate();
    const Log_info = sequelize.define("log_info", {
      id: {
        type: Sequelize.TEXT,
        primaryKey: true
      },
      log_name: Sequelize.TEXT,
      description: Sequelize.TEXT,
      severity: Sequelize.TEXT
    });

    await sequelize.sync();
    console.log("connected to DB")

    // var [entries] = await log.getEntries();
    // entries.forEach(entry => {
    //   const metadata = entry.metadata;
    //   if (metadata[metadata.payload] = "Hello, world !") {
    //     const data =
    //       Log_info.create({
    //         id: metadata.insertId,
    //         log_name: metadata.logName,
    //         description: metadata[metadata.payload],
    //         severity: metadata.severity
    //       });
    //   }
    // });

    const fastify = require('fastify')({
      logger: true
    })
    const app = fastify;
    app.get("/data", (req, reply) =>
      Log_info.findAll().then((data) => reply.send(data))

    );

    // app.post("/data", (req, reply) =>
    //   Log_info.create({
    //     id: metadata.insertId,
    //     log_name: metadata.logName,
    //     description: metadata[metadata.payload],
    //     severity: metadata.severity
    //   }));



    app.listen(8000, function (err, address) {
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