const PropertiesReader = require('properties-reader');
const property = PropertiesReader('./app.properties');

var prop;

/*gets property from path/to/app.properties
You can also export this function using module.exports*/
getProperty = (prop) => {return property.get(prop);}
//call the getProperty method
console.log(getProperty('server.port')); //3000

