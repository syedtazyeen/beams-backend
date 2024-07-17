import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Controller('stream')
export class StreamController {

    @Get(':key')
    async getStream(@Param('key') key: string, @Req() req, @Res() res) {
        const filePath = path.join(__dirname, '..', 'media', `${key}`, `index.m3u8`);

        if (!fs.existsSync(filePath)) {
            return "stream not found";
        }
        const stat = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Content-Length': stat.size
        });
        fs.createReadStream(filePath).pipe(res);
    }
}
