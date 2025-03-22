import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
export  const upload = multer({ storage })



// import multer from "multer";
// import fs from "fs";
// import path from "path";

// // Ensure upload directory exists
// const uploadDir = path.join(process.cwd(), "public/temp");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + "-" + file.originalname);
//     }
// });

// export const upload = multer({ storage });

