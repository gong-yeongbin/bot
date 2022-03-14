import mongoose, { Schema, Model } from 'mongoose';

export interface IWeather {
  T1H: string; //기온
  RN1: string; //1시간 강수량
  UUU: string; //동서바람성분
  VVV: string; //남북바람성분
  REH: string; //습도
  PTY: string; //강수형태
  VEC: string; //풍향
  WSD: string; //풍속
  regDt: Date;
}

const weatherSchema: Schema<IWeather> = new Schema(
  {
    T1H: { type: String, required: true, default: '' },
    RN1: { type: String, required: true, default: '' },
    UUU: { type: String, required: true, default: '' },
    VVV: { type: String, required: true, default: '' },
    REH: { type: String, required: true, default: '' },
    PTY: { type: String, required: true, default: '' },
    VEC: { type: String, required: true, default: '' },
    WSD: { type: String, required: true, default: '' },
    regDt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model<IWeather>('Weather', weatherSchema);
