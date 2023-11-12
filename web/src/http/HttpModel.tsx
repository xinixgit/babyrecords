export interface FeedRecord {
  type: string
  vol: number
  feed_time: string
  unit: string
}

export interface SaveRecordRequest {
  type: string
  feed_record?: FeedRecord
}