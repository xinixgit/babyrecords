import TableWithHeader from '../components/TableWithHeader'
import { DiaperRecord, FeedRecord, SleepRecord } from '../http/HttpModel'
import { GetAllRecords } from '../http/Api'
import { useState } from 'react';

interface TableContent {
  header: string[]
  rows: string[][]
}

const Dashboard = () => {
  const [feedTableContent, setFeedTableContent] = useState({ header: [''], rows: [['']] })
  const [diaperTableContent, setDiaperTableContent] = useState({ header: [''], rows: [['']] })
  const [sleepTableContent, setSleepTableContent] = useState({ header: [''], rows: [['']] })
  GetAllRecords((data) => {
    const feedTable = createFeedRecordTable(data.feed_records)
    const diaperTable = createDiaperRecordTable(data.diaper_records)
    const sleepTable = createSleepRecordTable(data.sleep_records)
    setFeedTableContent(feedTable)
    setDiaperTableContent(diaperTable)
    setSleepTableContent(sleepTable)
  })

  return (
    <>
      <TableWithHeader header="Feed Records" tableHeader={feedTableContent.header} rows={feedTableContent.rows} />
      <TableWithHeader header="Diaper Records" tableHeader={diaperTableContent.header} rows={diaperTableContent.rows} />
      <TableWithHeader header="Sleep Records" tableHeader={sleepTableContent.header} rows={sleepTableContent.rows} />
    </>
  )
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
      rec.vol + '',
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
  const parsed = Date.parse(timeStr)
  const time = new Date(parsed)
  return `${time.getMonth()}/${time.getDate()}/${time.getFullYear()} ` +
    `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
}

export default Dashboard