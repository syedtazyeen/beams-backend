import { Controller, Get } from '@nestjs/common';

@Controller('event')
export class EventController {

  @Get('')
  getEvent() {
    return "Event created"
  }
}