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
      feed_time: ctx.time
    }
    return req
  }

  if (ctx.type == RecordTypeSleep) {
    return req
  }

  if (ctx.type == RecordTypeDiaper) {
    req.diaper_record = {
      size: ctx.diaperSize
    }
    return req
  }

  throw new TypeError(ctx.type + ' is undefined')
}