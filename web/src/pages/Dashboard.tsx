import TableWithHeader from '../components/TableWithHeader'
import { DiaperRecord, FeedRecord, SleepRecord } from '../http/HttpModel'
import { GetAllRecords } from '../http/Api'
import { useState, useEffect } from 'react';
import { PadZero } from '../components/Util'

interface TableContent {
  header: string[]
  rows: string[][]
}

const Dashboard = () => {
  const [tableContent, setTableContent] = useState({
    feedTable: { header: [''], rows: [['']] },
    diaperTable: { header: [''], rows: [['']] },
    sleepTable: { header: [''], rows: [['']] }
  })

  useEffect(() => {
    GetAllRecords((data) => {
      const feedTable = createFeedRecordTable(data.feed_records)
      const diaperTable = createDiaperRecordTable(data.diaper_records)
      const sleepTable = createSleepRecordTable(data.sleep_records)
      const _tableContent = {
        feedTable: feedTable,
        diaperTable: diaperTable,
        sleepTable: sleepTable,
      }
      setTableContent(_tableContent)
    })
  }, [setTableContent])


  return (
    <>
      <TableWithHeader
        header="Feed Records"
        tableHeader={tableContent.feedTable.header}
        rows={tableContent.feedTable.rows}
        aggregate={aggregateFeedRecords}
      />
      <TableWithHeader
        header="Diaper Records"
        tableHeader={tableContent.diaperTable.header}
        rows={tableContent.diaperTable.rows}
        aggregate={(rows) => rows.length + ' 次'}
      />
      <TableWithHeader
        header="Sleep Records"
        tableHeader={tableContent.sleepTable.header}
        rows={tableContent.sleepTable.rows}
        aggregate={aggregateSleepRecords}
      />
    </>
  )
}

function aggregateFeedRecords(rows: string[][]): string {
  type totalType = Record<string, { vol: number, unit: string }>
  const total: totalType = {}
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const type = row[0]
    if (typeof total[type] === 'undefined') {
      total[type] = { vol: parseInt(row[1]), unit: row[2] }
    } else {
      total[type].vol += parseInt(row[1])
    }
  }

  let str = ''
  for (const key in total) {
    if (str !== '') {
      str += ', '
    }

    const val = total[key]
    str += `${key}: ${val.vol} ${val.unit}`
  }
  return str
}

function aggregateSleepRecords(rows: string[][]): string {
  let sum = 0
  for (const i in rows) {
    const start: string = rows[i][0]
    const end: string = rows[i][1]
    if (end === '') {
      continue
    }

    const tsStart = Date.parse(start)
    const tsEnd = Date.parse(end)
    const min = (tsEnd - tsStart) / 1000 / 60
    sum += min
  }

  return `${sum} 分钟`
}

function createFeedRecordTable(recs: FeedRecord[]): TableContent {
  const header = [
    "type",
    "volume",
    "unit",
    "time"
  ]

  const rows = recs.map(rec => {
    return [
      rec.type,
      rec.vol.toString(),
      rec.unit,
      formatTime(rec.time)
    ]
  })

  return {
    header: header,
    rows: rows
  }
}

function createDiaperRecordTable(recs: DiaperRecord[]): TableContent {
  const header = [
    "size",
    "time"
  ]

  const rows = recs.map(rec => {
    return [
      rec.size,
      formatTime(rec.time)
    ]
  })

  return {
    header: header,
    rows: rows
  }
}

function createSleepRecordTable(recs: SleepRecord[]): TableContent {
  const header = [
    "start_time",
    "end_time"
  ]

  const rows = recs.map(rec => {
    return [
      formatTime(rec.start_time),
      typeof rec.end_time === 'undefined' ? '' : formatTime(rec.end_time)
    ]
  })

  return {
    header: header,
    rows: rows
  }
}

function formatTime(timeStr: string): string {
  if (timeStr === '') {
    return '-'
  }

  const parsed = Date.parse(timeStr)
  const time = new Date(parsed)
  return `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()} ` +
    `${PadZero(time.getHours())}:${PadZero(time.getMinutes())}`
}

export default Dashboard