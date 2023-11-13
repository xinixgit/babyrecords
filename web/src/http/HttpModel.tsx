export interface FeedRecord {
  type: string
  vol: number
  unit: string
  feed_time: string
}

export interface SaveRecordRequest {
  type: string
  feed_record?: FeedRecord
}