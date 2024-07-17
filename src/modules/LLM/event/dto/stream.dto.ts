import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class StreamEventDto {
    @IsNotEmpty()
    eventId: string;

    @IsEmpty()
    desc: string;
}
