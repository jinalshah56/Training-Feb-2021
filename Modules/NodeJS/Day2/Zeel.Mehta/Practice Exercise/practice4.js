//4. Create two txt files, write some dummy text. Read two file content and print it in the console. 
//use async and await.

const fs = require('fs');
  fs.createWriteStream("demo1.txt");
  fs.createWriteStream("demo2.txt");
  fs.writeFile('demo1.txt', 'Hello Javascript !!! \n', function (err) {
    if (err) return console.log(err);
    console.log('Demo1 Created');
   });
   fs.writeFile('demo2.txt', 'Hello Node.js !!! \n', function (err) {
    if (err) return console.log(err);
    console.log('Demo2 Created');
   });

fs.readFile('demo1.txt', 'utf8', function(err, contents) {
  console.log(contents);
})
 fs.readFile('demo2.txt', 'utf8', function(err, contents) {
      console.log(contents);
  })