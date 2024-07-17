import { Module } from '@nestjs/common';
import { StreamController } from './stream.controller';
import * as NodeMediaServer from 'node-media-server';
import * as ffmpeg from 'ffmpeg-static'


@Module({
  controllers: [StreamController]
})
export class StreamModule {
  private nms: NodeMediaServer;

  constructor() {
    this.nms = new NodeMediaServer({
      rtmp: {
        port: 1935, // RTMP port
        chunk_size: 60000, // Adjust chunk size
        gop_cache: true, // Enable GOP cache
        ping: 60, // Ping interval in seconds
        ping_timeout: 30 // Ping timeout in seconds
      },
      http: {
        port: 8000,
        allow_origin: '*',
        mediaroot: './media'
      },
      trans: {
        ffmpeg: ffmpeg,
        tasks: [
          {
            app: 'live',
            vc: "copy",
            vcParam: [],
            ac: "aac",
            acParam: ['-ab', '64k', '-ac', '1', '-ar', '44100'],
            rtmp: false,
            //rtmpApp: 'live2',
            hls: true,
            hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            dash: false,
            //dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
          }
        ]
      }
    });
    this.nms.run()
  }

}
