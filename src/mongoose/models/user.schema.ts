import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as shortid from 'shortid';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  streamKey: { type: String, default: shortid.generate },
}, {
  timestamps: true,
});

UserSchema.methods.generateHash = function (password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

export interface User extends mongoose.Document {
  _doc: { [x: string]: any; password: any; };
  email: string;
  password: string;
  username: string;
  streamKey: string;
  generateHash(password: string): string;
  validPassword(password: string): boolean;
}

export const UserModel = mongoose.model<User>('User', UserSchema);


export interface IPropUser {
  email: string,
  password: string,
  username: string,
  streamkey?: string
}