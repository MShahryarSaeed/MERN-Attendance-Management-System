

const AdminAuthorization=(req,res,next)=>{

    if(req.user.role=="admin"){

        next()
       
    }else{

        throw {message:"Unauthorized User",statusCode:401}
        
    }

   
}

module.exports=AdminAuthorization;