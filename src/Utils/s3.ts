import aws from 'aws-sdk';
import fs from "fs";
import { AWS_BUCKET, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_REGION } from "../../Config";

var credentials: any = {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
};
aws.config.update({ credentials: credentials, region: AWS_REGION });
const s3 = new aws.S3();

const awsconf = {
    // @AWS-CONFIG

    // @Service: upload file
    async uploadfile(file: any) {
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: AWS_BUCKET + `profile/`,
            Body: fileStream,
            Key: file.filename,
        };
        return s3.upload(uploadParams).promise();
    },
}
export default awsconf;