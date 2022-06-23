import AWS from "aws-sdk";
export const BASE_URL = "https://api.datacse.com";
// export const BASE_URL = "https://3f61-39-62-56-179.ap.ngrok.io";

export const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});

export const myBucket = new AWS.S3({
  params: {
    Bucket: S3_BUCKET,
  },
  region: REGION,
});
