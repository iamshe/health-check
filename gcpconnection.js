const { Logging } = require('@google-cloud/logging');

async function quickstart(
  projectId = 'citric-scope-272114',
  logName = 'log_file') {

  const logging = new Logging({ projectId });

  var log = logging.log(logName);
  // console.log('Logs:',log); 

  const text = 'Hello World!';

  const metadata = {
    resource: { type: 'global' },
    severity: 'INFO',
    message: 'Hello World!.',
  };

  const entry = log.entry(metadata, text);


  async function writeLog() {
    await log.write(entry);
    // console.log('Logged',entry);
  }
  writeLog(log);

  async function readLogs() {
    var [entries] = await log.getEntries();
    entries.forEach(entry => {
      const metadata = entry.metadata;
      // console.log('Logs:', metadata[metadata.payload]);
      if (metadata[metadata.payload] = "Hello, world !") {
        console.log(metadata.insertId);

      }
    });

  readLogs(log);

    return log;
  }
}

module.exports = { quickstart };


