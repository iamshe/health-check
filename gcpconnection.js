const { Logging } = require('@google-cloud/logging');
const PropertiesReader = require('properties-reader');
const gcpconnection = require('./gcpconnection')
const property = PropertiesReader('./app.properties');
getProperty = (prop) => { return property.get(prop); }

async function connectGCP(
  projectId = 'citric-scope-272114',
  logName = 'health-check-log') {

  const logging = new Logging({ projectId });

  var log = logging.log(logName);
  // console.log('Logs:',log); 

  //invoking method to write logs
  //writeLog(log);

  //invoking method to read logs
  //readLogs(log);
  return log;
}
//writeLog()
async function writeLog() {
  var healthLog = await connectGCP(getProperty('gcp.project.id'), getProperty('gcp_log_file'));
  const text = 'Hello World!';
  const metadata = {
    resource: { type: 'global' },
    severity: 'INFO',
    message: 'Hello World!.',
  };
  const entry = await healthLog.entry(metadata, text);
  await healthLog.write(entry).then(data => console.log('Logged', entry));
}
readLogs()
async function readLogs() {
  var readhealthLog = await connectGCP(getProperty('gcp.project.id'), getProperty('gcp_log_file'));
  var [entries] = await readhealthLog.getEntries();
  entries.forEach(entry => {
    const metadata = entry.metadata;
    if (metadata[metadata.payload] = "Hello, world !") {
      console.log("Service UP");
    }
  });
  return [entries];
}

module.exports = { connectGCP, writeLog, readLogs }



