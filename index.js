// Taken from https://gooroo.io/GoorooTHINK/Article/17328/How-to-read-and-parse-a-CSV-file-using-NodeJS/27993#.WpW66mR6_GI
const csv = require('csv'); 
// loads the csv module referenced above.
​
const obj = csv(); 
// gets the csv module to access the required functionality
​
function MyCSV(Fone, Ftwo, Fthree) {
    this.FieldOne = Fone;
    this.FieldTwo = Ftwo;
    this.FieldThree = Fthree;
}; 
// Define the MyCSV object with parameterized constructor, this will be used for storing the data read from the csv into an array of MyCSV. You will need to define each field as shown above.
​
const MyData = []; 
// MyData array will contain the data from the CSV file and it will be sent to the clients request over HTTP. 
​
obj.from.path('../THEPATHINYOURPROJECT/TOTHE/csv_FILE_YOU_WANT_TO_LOAD.csv').to.array(function (data) {
    for (let index = 0; index < data.length; index++) {
        MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2]));
    }
    console.log(MyData);
});
//Reads the CSV file from the path you specify, and the data is stored in the array we specified using callback function.  This function iterates through an array and each line from the CSV file will be pushed as a record to another array called MyData , and logs the data into the console to ensure it worked.
​
const http = require('http');
//Load the http module.
​
const server = http.createServer(function (req, resp) {
    resp.writeHead(200, { 'content-type': 'application/json' });
    resp.end(JSON.stringify(MyData));
});
// Create a webserver with a request listener callback.  This will write the response header with the content type as json, and end the response by sending the MyData array in JSON format.
​
server.listen(8080);