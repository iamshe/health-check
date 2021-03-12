const { Logging } = require('@google-cloud/logging');

async function connectGCP(
  projectId = 'citric-scope-272114',
  logName = 'log_file') {

  const logging = new Logging({ projectId });

  var log = logging.log(logName);
  // console.log('Logs:',log); 

  //writeLog(log);

  readLogs(log);

}
async function writeLog(log) {
  const text = 'Hello World!';
  const metadata = {
    resource: { type: 'global' },
    severity: 'INFO',
    message: 'Hello World!.',
  };
  const entry = await log.entry(metadata, text);
  await log.write(entry).then(data => console.log('Logged', entry));
}

async function readLogs(log) {
  var [entries] = await log.getEntries();
  entries.forEach(entry => {
    const metadata = entry.metadata;
    if (metadata[metadata.payload] = "Hello, world !") {
      console.log("Service UP");
    }
  });
  return [entries];
}

module.exports = connectGCP('citric-scope-272114', 'log_file');


