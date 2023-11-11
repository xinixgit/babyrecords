import { Context, RecordTypeFeed, RecordTypeSleep, RecordTypeDiaper } from '../Model'
import { SaveRecordRequest } from './HttpModel'

export function CreateSaveRecordRequestFromContext(ctx: Context): SaveRecordRequest {
  const req: SaveRecordRequest = {
    type: ctx.type
  }

  if (ctx.type == RecordTypeFeed) {
    req.feed_record = {
      type: ctx.feedType,
      vol: ctx.vol,
      unit: 'ml'
    }
    return req
  }

  if (ctx.type == RecordTypeSleep) {
    return req
  }

  if (ctx.type == RecordTypeDiaper) {
    return req
  }

  throw new TypeError(ctx.type + ' is undefined')
}