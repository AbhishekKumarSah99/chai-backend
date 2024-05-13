import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINRY_CLOUD_NAME, 
  api_key: process.env.CLOUDINRY_API_KEY, 
  api_secret: process.env.CLOUDINRY_API_SECRETE
});

const uploadOnCloudinary=async (locationFilePath)=>{
    try{
        if(!locationFilePath) return null;
        //upload the file to cloudinary 
        const response =cloudinary.uploader.upload(locationFilePath,{
            resource_type:"auto"//upload any type of file
        })

        console.log("file is uploaded on cloudinary",response.url)
        fs.unlinkSync(locationFilePath)
        return response;
    }catch(error){
        fs.unlinkSync(locationFilePath)//remove the locally saved temporary file as the upload operation got failed
    }
}

export default  uploadOnCloudinary