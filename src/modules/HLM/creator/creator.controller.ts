import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from 'src/modules/MLM/auth/guard/local.guard';
import { CreatorService } from './creator.service';
import { CreateEventDto } from 'src/modules/LLM/event/dto/create.dto';
import { StreamEventDto } from 'src/modules/LLM/event/dto/stream.dto';

@UseGuards(LocalGuard)
@Controller('creator')
export class CreatorController {
    constructor(
        private readonly creatorService: CreatorService
    ) { }

    @Post('event/create')
    async createEvent(@Req() req: any, @Body() createEventDto: CreateEventDto): Promise<any> {
        const { _id } = req.user
        return this.creatorService.createEvent(createEventDto, _id);
    }



    @Post('event/stream')
    async streamEvent(@Req() req: any, @Body() streamEventDto: StreamEventDto): Promise<any> {
        const { streamKey } = req.user      
        return this.creatorService.streamEvent(streamEventDto, streamKey );
    }


}
