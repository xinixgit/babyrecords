export interface FeedRecord {
  id?: string
  type: string
  vol: number
  unit: string
  time: string
}

export interface DiaperRecord {
  id?: string
  size: string
  time: string
}

export interface SleepRecord {
  id?: string
  start_time: string
  end_time?: string
}

export interface PumpRecord {
  id?: string
  vol: number
  time: string
}

export interface SaveRecordRequest {
  type: string
  feed_record?: FeedRecord
  diaper_record?: DiaperRecord
  sleep_record?: SleepRecord
  pump_record?: PumpRecord
}

export interface UpdateSleepRecordRequest {
  sleep_record: SleepRecord
}

export interface GetSleepRecordResponse {
  sleep_record?: SleepRecord
}

export interface GetAllRecordsResponse {
  feed_records: FeedRecord[]
  diaper_records: DiaperRecord[]
  sleep_records: SleepRecord[]
  pump_records: PumpRecord[]
}

export interface DailyVol {
  date: string
  vol: number
}

export interface GetFeedPumpSummaryResponse {
  feed: DailyVol[]
  pump: DailyVol[]
}

export interface LoginResponse {
  refresh_token: string
  refresh_token_ttl: number
  auth_token: string
  auth_token_ttl: number
}

export interface RefreshTokenResponse {
  auth_token: string
  auth_token_ttl: number
}
