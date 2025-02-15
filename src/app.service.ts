import { Injectable } from '@nestjs/common';
import { UrlPresignedUseCases } from './url-presigned.usecase';

@Injectable()
export class AppService {
  constructor(private readonly urlPresignedUseCases: UrlPresignedUseCases) {}

  async getPresignedUrl(filename: string) {
    const bucketName = process.env.AWS_BUCKET_NAME;
    console.log(bucketName);
    return this.urlPresignedUseCases.getPresignedUrl(bucketName!, filename);
  }
}
