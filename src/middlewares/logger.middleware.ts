import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as useragent from 'useragent';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      const userAgent = useragent.parse(req.headers['user-agent']);
      const clientDevice = `${userAgent.device.toString()}, ${userAgent.os.toString()}`;
      const timestamp = new Date().toISOString();

      this.logger.log(`[${timestamp}] [${ip}] [${method}] - ${originalUrl} ${statusCode} : ${duration}ms [${clientDevice}]`);
    });

    next();
  }
}
