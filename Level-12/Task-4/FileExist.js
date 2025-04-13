const fs=require('fs');

file='test1.txt';

if(fs.existsSync(file)){
    console.log("file exist")
}
else{
    console.log('file not exist')
}