const fs=require('fs');

const newContent='This ia alter msg!'

fs.appendFile('output.txt',newContent,(err)=>{
    if(err){
        console.error(err);
    }
    else {
        console.log('Appended');
    }
})