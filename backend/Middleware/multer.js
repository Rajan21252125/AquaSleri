import multer from "multer";


// Set up Multer for handling file uploads
const storage = multer.diskStorage({});

const upload = multer({ storage: storage, limits: { fileSize: 5000000 }});


export default upload;