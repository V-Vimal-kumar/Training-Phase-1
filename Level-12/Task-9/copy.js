const fs=require('fs')

const source='source.txt'
const destin='copied.txt'

if(fs.existsSync(destin)){
    console.log("You are already copied the file")
}
else(fs.copyFile(source,destin,(err)=>{
    if(err){
        console.error(err)
    }
    else{
        console.log('File copied')
    }
}))