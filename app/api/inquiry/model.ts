import type { Model } from "mongoose";
import mongoose, { model } from "mongoose";

interface IData {
  name: string;
  contact: string;
  company: string;
  item: string;
  address: string;
  addressDetail: string;
  agreedToTerms: Boolean;
  isDone: Boolean;
  date: Date;
}

const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [10, "name cannot be more than 10 characters"],
  },
  contact: {
    type: String,
    required: [true, "Please provide a contact"],
  },
  company: {
    type: String,
    required: [true, "Please provide a company"],
  },
  item: {
    type: String,
    required: [true, "Please provide a item"],
  },
  address: {
    type: String,
    required: [true, "Please provide a address"],
  },
  addressDetail: {
    type: String,
    required: false,
  },
  agreedToTerms: {
    type: Boolean,
    required: [true, "Please provide a agreedToTerms"],
  },
  isDone: {
    type: Boolean,
    default: false, // 기본값으로 false 설정
  },
  date: {
    type: Date,
    default: Date.now, // 현재 날짜 및 시간으로 기본값 설정
  },
});

DataSchema.methods.validateFields = function () {
  const errors = this.validateSync();
  if (errors) {
    throw new Error(errors.errors);
  }
};

export default (mongoose.models.inquiry ||
  model<IData>("inquiry", DataSchema)) as Model<IData>;
