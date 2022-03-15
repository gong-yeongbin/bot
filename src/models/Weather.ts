import mongoose, { model, Schema, Model } from 'mongoose';

interface IWeather extends Document {
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

interface IWeatherDocument extends IWeather, Document {}
interface IWeatherModel extends Model<IWeatherDocument> {}

const weatherSchema: Schema = new Schema(
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

const Weather = mongoose.model<IWeatherDocument, IWeatherModel>(
  'Weather',
  weatherSchema
);

export default Weather;
