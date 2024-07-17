import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
    @IsString()
    name: string;

    @IsEmpty()
    desc: string;

    @IsNotEmpty()
    categoryId: string;
}
