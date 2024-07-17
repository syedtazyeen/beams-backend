import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPropEvent, Event } from 'src/mongoose/models/event.schema';

@Injectable()
export class EventService {
    constructor(@InjectModel('Event') private readonly eventModel: Model<Event>) { }

    async findOne(email: string): Promise<Event | undefined> {
        return this.eventModel.findOne({ email: email }).exec();
    }

    async findById(id: string): Promise<Event | undefined> {
        return this.eventModel.findById(id).exec();
    }
    async create(event: IPropEvent): Promise<Event> {
        const createdEvent = new this.eventModel(event);
        return await createdEvent.save();
    }

    async update(id: string, event: any): Promise<Event | null> {
        return this.eventModel.findByIdAndUpdate(id, event, { new: true }).exec();
    }

    async delete(id: string): Promise<Event | null> {
        return this.eventModel.findByIdAndDelete(id).exec();
    }
}
