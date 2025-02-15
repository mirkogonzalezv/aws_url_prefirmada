import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class UrlPresignedUseCases {
  async getPresignedUrl(bucketName: string, filename: string) {
    const region = process.env.AWS_BUCKET_REGION;
    const accessKey = process.env.AWS_ACCESS_KEY;
    const secretKey = process.env.AWS_SECRET_KEY;

    const s3 = new S3({
      region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      signatureVersion: 'v4',
    });

    const params = {
      Bucket: bucketName,
      Key: filename,
      Expires: 60,
      ContentType: 'application/vnd.ms-excel',
    };

    const url = await s3.getSignedUrlPromise('putObject', params);
    return url;
  }
}
