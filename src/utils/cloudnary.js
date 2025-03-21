import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary = async (localFilePath)=>{
        try {
            if(!localFilePath) return null
            //upload the file on cloudinary
           const response =await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
            //file has been uploaded successfull
            console.log("file is uploaded on cloudnary".response.url);
            return response
        }catch(error){
            fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation got failde
            return null;
        }
    }

    cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/ae/Olympic_flag.jpg", 
        { public_id: "olympic_flag" }, 
        function(error, result) {
          if (error) {
            console.error("Upload error:", error);
          } else {
            console.log("Upload successful:", result);
          }
        }
      );

      export {uploadOnCloudinary}