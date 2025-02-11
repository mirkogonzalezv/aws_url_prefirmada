import { UrlPresignedUseCases } from './url-presigned.usecase';
import { S3 } from 'aws-sdk';
jest.mock('aws-sdk', () => {
  return {
    S3: jest.fn().mockImplementation(() => ({
      getSignedUrlPromise: jest
        .fn()
        .mockResolvedValue('https://mock-presigned-url.com'),
    })),
  };
});

describe('UrlPresignedUseCase', () => {
  let urlPresignedUseCases: UrlPresignedUseCases;
  let s3Mock: jest.Mocked<S3>;

  beforeEach(() => {
    urlPresignedUseCases = new UrlPresignedUseCases();
    s3Mock = new S3() as jest.Mocked<S3>;
  });

  it('deberia retornar una URL firmada de S3', async () => {
    const mockBucket = 'test-bucket';
    const mockFilename = 'test-file.xlsx';
    const mockContentType = 'application/vnd.ms-excel';
    const mockUrl = 'https://mock-presigned-url.com';
    const url = await urlPresignedUseCases.getPresignedUrl(
      mockBucket,
      mockFilename,
      mockContentType,
    );

    expect(url).toBe(mockUrl);
    expect(() =>
      s3Mock.getSignedUrlPromise('putObject', {
        Bucket: mockBucket,
        Key: mockFilename,
        Expires: 60,
        ContentType: mockContentType,
      }),
    );
  });
});
