import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PresignedUrlDto } from './presigned-url.dto';
import { PresignedUrlDtoResult } from './presigned-url-result.dto';

@Controller('s3')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('presigned-url')
  async getPresignedUrl(
    @Query('filename') query: PresignedUrlDto,
  ): Promise<PresignedUrlDtoResult> {
    const { filename, contentType } = query;
    const url = await this.appService.getPresignedUrl(filename, contentType);
    return { url };
  }
}
