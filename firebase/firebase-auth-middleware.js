import admin from "./firebase-admin.js";

const myLogger = async function(req,res,next){
    const token = req.headers.authorization;
    console.log(token);
    try{
  
    const decodeValue = await admin.auth().verifyIdToken(token);
    console.log("TOKEN:"+decodeValue.uid);
    if(decodeValue){
      console.log("TOKEN:"+decodeValue);
        return next();
    }
  
    return res.json({message:"Authorization..."});
                
  }catch(e){
    return res.json({message:"Authorization error!"});
  }
  }

export default myLogger;