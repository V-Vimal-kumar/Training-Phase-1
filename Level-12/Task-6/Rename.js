const fs=require('fs');

ogfile='sample.txt';
renameFile='renamed.txt'

fs.rename(ogfile,renameFile,(err)=>{
    if(err){
        console.error(err.message)
    }
    console.log(`ilename changed from ${ogfile} to ${renameFile}`);
}
)