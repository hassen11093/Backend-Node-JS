
exports.uploadImage= (req,res,next) => {
    try{
        const file = req.file;
        if (!file) {
            res.status(400).json({
                "status": "failed",
                "code" : "400",
                "message" : "Please upload file"
            });
        }

        res.status(200).json({
            "status": "success",
            "code" : "200",
            "message" : "file uploaded succesfully"
        });
    }catch(err){
        console.log(error.message);
        res.status(200).json({
            "status": "failed",
            "code" : "500",
            "message" : error.message
        });
    }
};

exports.uploadMoreImages=(req,res,next) => {
    try{
        const files = req.files;
        console.log("lllllllllllllll", files);
        if (!files) {
            res.status(400).json({
                "status": "failed",
                "code" : "400",
                "message" : "Please upload file"
            });
        }

        res.status(200).json({
            "status": "success",
            "code" : "200",
            "message" : "file uploaded successfully",
            "data" : files
        });
    }catch(error){
        res.status(200).json({
            "status": "failed",
            "code" : "500",
            "message" : error.message
        });
    }
};