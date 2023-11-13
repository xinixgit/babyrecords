export interface FeedRecord {
  type: string
  vol: number
  unit: string
  time: string
}

export interface DiaperRecord {
  size: string
  time: string
}

export interface SaveRecordRequest {
  type: string
  feed_record?: FeedRecord
  diaper_record?: DiaperRecord
}