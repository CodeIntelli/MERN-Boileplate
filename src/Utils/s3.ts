
import aws from 'aws-sdk';
import fs from "fs"
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET } from "../../Config"
aws.config.update({
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY,
    region: AWS_REGION
});

const s3 = new aws.S3();

const uploadFile = (file: any) => {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: AWS_BUCKET + `/profile`,
        Body: fileStream,
        Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
};
export { uploadFile, s3 };