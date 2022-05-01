import multer from "multer"

//multer
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files") //dir path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  },
})

export const upload = multer({ storage: storage })
