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

export interface SleepRecord {
  id?: number
  start_time: string
  end_time?: string
}

export interface SaveRecordRequest {
  type: string
  feed_record?: FeedRecord
  diaper_record?: DiaperRecord
  sleep_record?: SleepRecord
}

export interface UpdateSleepRecordRequest {
  sleep_record: SleepRecord
}

export interface GetSleepRecordResponse {
  sleep_record?: SleepRecord
}
