export const RecordTypeFeed = 'feed'
export const RecordTypeSleep = 'sleep'
export const RecordTypeDiaper = 'diaper'

export const AM = 'am'
export const PM = 'pm'

export interface Context {
  type: string
  feedType: string
  vol: number
  time: string
}

