import { DailyVol, GetFeedPumpSummaryResponse } from '../http/HttpModel'

export function extractDates(data: GetFeedPumpSummaryResponse): string[] {
  const dateMap = new Map()
  for (const i in data.feed) {
    dateMap.set(data.feed[i].date, 0)
  }
  for (const i in data.pump) {
    dateMap.set(data.pump[i].date, 0)
  }

  const dates = []
  for (const date of dateMap.keys()) {
    dates.push(date)
  }

  dates.sort()
  return dates
}

export function extractPumpData(dates: string[], volList: DailyVol[]): number[] {
  const points = []
  for (const i in dates) {
    const date = dates[i]
    let pumpVol = 0
    for (const j in volList) {
      if (volList[j].date === date) {
        pumpVol = volList[j].vol
        break;
      }
    }

    points.push(pumpVol)
  }

  return points
}

export function extractDiff(dates: string[], pumpVols: DailyVol[], feedVols: DailyVol[]): number[] {
  const points = []
  for (const i in dates) {
    const date = dates[i]

    let pumpVol = 0
    for (const p in pumpVols) {
      if (pumpVols[p].date === date) {
        pumpVol = pumpVols[p].vol
        break;
      }
    }

    let feedVol = 0
    for (const j in feedVols) {
      if (feedVols[j].date === date) {
        feedVol = feedVols[j].vol
        break;
      }
    }

    const diff = pumpVol - feedVol
    points.push(diff)
  }

  return points
}