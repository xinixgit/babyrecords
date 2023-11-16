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
      <TableWithHeader header="Feed Records" tableHeader={tableContent.feedTable.header} rows={tableContent.feedTable.rows} />
      <TableWithHeader header="Diaper Records" tableHeader={tableContent.diaperTable.header} rows={tableContent.diaperTable.rows} />
      <TableWithHeader header="Sleep Records" tableHeader={tableContent.sleepTable.header} rows={tableContent.sleepTable.rows} />
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
  if (timeStr === '') {
    return '-'
  }

  const parsed = Date.parse(timeStr)
  const time = new Date(parsed)
  return `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()} ` +
    `${PadZero(time.getHours())}:${PadZero(time.getMinutes())}`
}

export default Dashboard