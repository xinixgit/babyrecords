export interface FeedRecord {
  type: string
  vol: number
  unit: string
}

export interface SaveRecordRequest {
  type: string
  feed_record?: FeedRecord
}