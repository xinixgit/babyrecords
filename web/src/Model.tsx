export const RecordTypeFeed = 'feed'
export const RecordTypeSleep = 'sleep'
export const RecordTypeDiaper = 'diaper'

export const AM = 'am'
export const PM = 'pm'
export const S = 'S'
export const M = 'M'
export const L = 'L'

export const SUCCESS = "success"

export interface Context {
  type: string
  feedType: string
  feedVol: number
  feedUnit: string
  diaperSize: string
  time: string
}

