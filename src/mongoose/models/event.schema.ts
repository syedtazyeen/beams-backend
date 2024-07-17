import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String },
    streamKey: { type: String },
    status: { type: String, default: 'scheduled' },
    creatorId: { type: String, required: true },
    categoryId: { type: String, required: true },
    eventAt: { type: String, default: new Date().toISOString() },
}, {
    timestamps: true,
});

export interface Event extends mongoose.Document {
    name: string;
    desc: string;
    streamKey?: string;
    status?: string;
    creatorId: string;
    categoryId: string;
}

export const UserModel = mongoose.model<Event>('Event', EventSchema);

export interface IPropEvent {
    name: string;
    desc: string;
    streamKey?: string;
    status?: string;
    creatorId: string;
    categoryId: string;
}

