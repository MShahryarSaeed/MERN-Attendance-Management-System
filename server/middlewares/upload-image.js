const multer=require("multer");
const {v4:uuidv4}=require("uuid");

const storage=multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },

    filename:(req,file,cb)=>{
        const fileName=uuidv4()+ "_" +file.originalname.replace(/\//g,"");
        cb(null,fileName);
    }

    
});

const fileFilter=(req,file,cb)=>{
    const type=file.mimetype;

    if(type==='image/jpeg' || type==='image/png' || type==='image/jpg'){
        cb(null,true)
    }else{

        cb(null,false)
    }
}


const upload=multer({

    storage:storage,
    fileFilter
})

module.exports=upload;