
import aws from 'aws-sdk';
import fs from "fs"
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET } from "../../Config"
aws.config.update({
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY,
    region: AWS_REGION
});

const s3 = new aws.S3();

// @Service: uploadfile
const uploadFile = (file: any) => {

    // @ts-ignore
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: AWS_BUCKET + `/profile`,
        Body: fileStream,
        // @ts-ignore
        Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
};

// @Service : GetSignedURL
const getSignedUrl = async (fileKey: any) => {
    console.log(fileKey)
    const signedUrlExpireSeconds = 18000;
    try {
        const url = s3.getSignedUrl("getObject", {
            Bucket: AWS_BUCKET,
            Key: `profile/${fileKey}`,
            Expires: signedUrlExpireSeconds,
        });
        return url;
    } catch (headErr: any) {
        console.log(headErr);
        if (headErr.code === "NotFound") {
            return false;
        }
    }
};


export { uploadFile, s3, getSignedUrl };