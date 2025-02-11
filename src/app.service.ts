import { Injectable } from '@nestjs/common';
import { UrlPresignedUseCases } from './url-presigned.usecase';

@Injectable()
export class AppService {
  constructor(private readonly urlPresignedUseCases: UrlPresignedUseCases) {}

  async getPresignedUrl(filename: string, contentType: string) {
    const bucketName = process.env.AWS_BUCKET_NAME;
    return this.urlPresignedUseCases.getPresignedUrl(
      bucketName!,
      filename,
      contentType,
    );
  }
}
