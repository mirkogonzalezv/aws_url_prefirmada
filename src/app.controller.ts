import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('interesados')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id/procesos/:idProceso/obtenerUrl')
  async getPresignedUrl(
    @Param('id') idInteresado: string,
    @Param('idProceso') idProceso: string,
    @Query('filename') nombreArchivo: string,
    @Query('proceso') nombreProceso: string,
  ): Promise<string> {
    console.log(nombreArchivo);
    console.log(nombreProceso);
    console.log(idInteresado);
    console.log(idProceso);
    // const url = await this.appService.getPresignedUrl(query);
    // return { url };
    await Promise.resolve();
    return 'HOLA';
  }
}
