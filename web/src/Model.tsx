export const RecordTypeFeed = 'feed'
export const RecordTypeSleep = 'sleep'
export const RecordTypeDiaper = 'diaper'
export const RecordTypePump = 'pump'

export const AM = 'am'
export const PM = 'pm'
export const S = 'S'
export const M = 'M'
export const L = 'L'
export const No1 = '尿尿'
export const No2 = '便便'

export const SUCCESS = "success"

export interface Context {
  type: string    // what record is it for
  subtype: string // subtype for the rec type
  vol: number
  unit: string
  time: string
}

