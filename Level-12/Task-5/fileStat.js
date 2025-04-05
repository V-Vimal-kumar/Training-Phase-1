const fs=require('fs');
const path = 'test.txt';

file='test.txt';

fs.stat(path,(err,stat)=>{
    if(err){
        console.error(err.message)
    }

    console.log(`file ${path}`)
    console.log(`size:${stat.size}bytes`)
    console.log(`created:${stat.birthtime.toLocaleString()}`)
    console.log(`last Modified:${stat.mtime.toLocaleString()}`)

})