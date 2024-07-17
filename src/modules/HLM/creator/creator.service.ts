import { Injectable } from '@nestjs/common';
import { CreateEventDto } from 'src/modules/LLM/event/dto/create.dto';
import { StreamEventDto } from 'src/modules/LLM/event/dto/stream.dto';
import { EventService } from 'src/modules/LLM/event/event.service';

@Injectable()
export class CreatorService {
    constructor(
        private readonly eventService: EventService
    ) { }


    async createEvent(payloadDto: any, id: string): Promise<any> {
        const { name, desc, categoryId } = payloadDto
        const event = await this.eventService.create({
            name: name,
            desc: desc,
            categoryId: categoryId,
            creatorId: id
        })
        return event
    }

    async streamEvent(streamEventDto: StreamEventDto, streamKey: string): Promise<any> {
        const streamingEvent = await this.eventService.update(streamEventDto.eventId, {
            status: 'live',
            streamKey: streamKey
        })
        return streamingEvent
    }

}
