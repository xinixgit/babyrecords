import { SaveRecordRequest } from './HttpModel'
import {
  Context,
  RecordTypeFeed,
  RecordTypeSleep,
  RecordTypeDiaper,
  RecordTypePump
} from '../Model'

export function CreateSaveRecordRequestFromContext(ctx: Context): SaveRecordRequest {
  const req: SaveRecordRequest = {
    type: ctx.type
  }

  if (ctx.type == RecordTypeFeed) {
    req.feed_record = {
      type: ctx.subtype,
      vol: ctx.vol,
      unit: ctx.unit,
      time: ctx.time
    }
    return req
  }

  if (ctx.type == RecordTypeSleep) {
    req.sleep_record = {
      start_time: ctx.time
    }
    return req
  }

  if (ctx.type == RecordTypeDiaper) {
    req.diaper_record = {
      size: ctx.subtype,
      time: ctx.time
    }
    return req
  }

  if (ctx.type == RecordTypePump) {
    req.pump_record = {
      vol: ctx.vol,
      time: ctx.time
    }
  }

  throw new TypeError(ctx.type + ' is undefined')
}