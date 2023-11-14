import { Context, RecordTypeFeed, RecordTypeSleep, RecordTypeDiaper } from '../Model'
import { SaveRecordRequest } from './HttpModel'

export function CreateSaveRecordRequestFromContext(ctx: Context): SaveRecordRequest {
  const req: SaveRecordRequest = {
    type: ctx.type
  }

  if (ctx.type == RecordTypeFeed) {
    req.feed_record = {
      type: ctx.feedType,
      vol: ctx.feedVol,
      unit: ctx.feedUnit,
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
      size: ctx.diaperSize,
      time: ctx.time
    }
    return req
  }

  throw new TypeError(ctx.type + ' is undefined')
}