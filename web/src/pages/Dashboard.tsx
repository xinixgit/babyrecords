import TableWithHeader from '../components/TableWithHeader'
import { TableContent, Row } from '../components/TableWithHeader'
import { DiaperRecord, FeedRecord, PumpRecord, SleepRecord } from '../http/HttpModel'
import { GetAllRecords, DeleteRecord } from '../http/Api'
import { useState, useEffect } from 'react';
import { PadZero, ToDateString } from '../components/Util'
import AuthenticatedNode from '../components/AuthenticatedNode'
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Dashboard = () => {
  const [tables, setTables] = useState({
    feed: { header: [''], rows: [{ id: '', data: [''] }] },
    diaper: { header: [''], rows: [{ id: '', data: [''] }] },
    sleep: { header: [''], rows: [{ id: '', data: [''] }] },
    pump: { header: [''], rows: [{ id: '', data: [''] }] }
  })

  useEffect(() => {
    refreshTableContents(new Date(), setTables)
  }, [setTables])

  const [inputDate, setInputDate] = useState(new Date());

  const [isModalOpen, setModalOpen] = useState(false)

  const [deleteRecord, setDeleteRecord] = useState(() => () => { })

  const handleDelete = (id: string) => {
    setModalOpen(true)
    setDeleteRecord(() => () => DeleteRecord(id, () => {
      refreshTableContents(inputDate, setTables)
      setModalOpen(false)
    }))
  }

  return (
    <AuthenticatedNode>
      <DatePicker selected={inputDate} onChange={(date: Date) => {
        setInputDate(date)
        refreshTableContents(date, setTables)
      }} />
      <TableWithHeader
        pageHeader="泵奶记录"
        table={tables.pump}
        onDelete={handleDelete}
      />
      <TableWithHeader
        pageHeader="喂食记录"
        table={tables.feed}
        onDelete={handleDelete}
      />
      <TableWithHeader
        pageHeader="尿布记录"
        table={tables.diaper}
        onDelete={handleDelete}
      />
      <TableWithHeader
        pageHeader="睡眠记录"
        table={tables.sleep}
        onDelete={handleDelete}
      />
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-content">
          <h2>确认删除？</h2>
          <button type="button" className="btn btn-primary" onClick={deleteRecord}>确认</button>
          <button type="button" className="btn btn-outline-dark" onClick={() => setModalOpen(false)}>取消</button>
        </div>
      </Modal>
    </AuthenticatedNode>
  )
}

function refreshTableContents(
  date: Date,
  setTables: (content: { feed: TableContent, diaper: TableContent, sleep: TableContent, pump: TableContent }) => void
) {
  const dateStr = ToDateString(date)
  GetAllRecords(dateStr, (data) => {
    const feedTable = createFeedRecordTable(data.feed_records)
    const diaperTable = createDiaperRecordTable(data.diaper_records)
    const sleepTable = createSleepRecordTable(data.sleep_records)
    const pumpTable = createPumpRecordTable(data.pump_records)
    const tables = {
      feed: feedTable,
      diaper: diaperTable,
      sleep: sleepTable,
      pump: pumpTable,
    }
    setTables(tables)
  })
}

function aggregateFeedRecords(rows: Row[]): string {
  type totalType = Record<string, { vol: number, unit: string }>
  const total: totalType = {}
  for (let i = 0; i < rows.length; i++) {
    const rowData = rows[i].data
    const type = rowData[0]
    if (typeof total[type] === 'undefined') {
      total[type] = { vol: parseInt(rowData[1]), unit: rowData[2] }
    } else {
      total[type].vol += parseInt(rowData[1])
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

function aggregateSleepRecords(rows: Row[]): string {
  const date = ToDateString(new Date())
  let sum = 0
  for (const i in rows) {
    const rowData = rows[i].data
    const start: string = date + ' ' + rowData[0]
    const end: string = date + ' ' + rowData[1]
    if (end === '') {
      continue
    }

    const tsStart = Date.parse(start)
    const tsEnd = Date.parse(end)
    const min = (tsEnd - tsStart) / 1000 / 60
    sum += min
  }

  return `${Math.floor(sum / 60)} 小时 ${sum % 60} 分钟`
}

function aggregatePumpRecords(rows: Row[]): string {
  let sum = 0
  for (let i = 0; i < rows.length; i++) {
    const rowData = rows[i].data
    const vol = rowData[0]
    sum += parseInt(vol)
  }
  return `${sum} 毫升`
}

function createFeedRecordTable(recs: FeedRecord[]): TableContent {
  const header = [
    "type",
    "volume",
    "unit",
    "time"
  ]

  const rows = recs.map(rec => {
    return {
      id: rec.id || '',
      data: [
        rec.type,
        rec.vol.toString(),
        rec.unit,
        formatTime(rec.time)
      ]
    }
  })

  if (rows.length > 0) {
    rows.sort((a, b) => (a.data[3].localeCompare(b.data[3])))
  }

  return {
    header: header,
    rows: rows,
    aggFn: aggregateFeedRecords
  }
}

function createDiaperRecordTable(recs: DiaperRecord[]): TableContent {
  const header = [
    "type",
    "time"
  ]

  const rows = recs.map(rec => {
    return {
      id: rec.id || '',
      data: [
        rec.size,
        formatTime(rec.time)
      ]
    }
  })

  if (rows.length > 0) {
    rows.sort((a, b) => (a.data[1].localeCompare(b.data[1])))
  }

  return {
    header: header,
    rows: rows,
    aggFn: (rows) => rows.length + ' 次'
  }
}

function createSleepRecordTable(recs: SleepRecord[]): TableContent {
  const header = [
    "start_time",
    "end_time"
  ]

  const rows = recs.map(rec => {
    return {
      id: rec.id || '',
      data: [
        formatTime(rec.start_time),
        typeof rec.end_time === 'undefined' ? '' : formatTime(rec.end_time)
      ]
    }
  })

  if (rows.length > 0) {
    rows.sort((a, b) => (a.data[0].localeCompare(b.data[0])))
  }

  return {
    header: header,
    rows: rows,
    aggFn: aggregateSleepRecords
  }
}

function createPumpRecordTable(recs: PumpRecord[]): TableContent {
  const header = [
    "volume",
    "time"
  ]

  const rows = recs.map(rec => {
    return {
      id: rec.id || '',
      data: [
        rec.vol.toString(),
        formatTime(rec.time)
      ]
    }
  })

  if (rows.length > 0) {
    rows.sort((a, b) => (a.data[1].localeCompare(b.data[1])))
  }

  return {
    header: header,
    rows: rows,
    aggFn: aggregatePumpRecords
  }
}

function formatTime(timeStr: string): string {
  if (timeStr === '') {
    return '-'
  }

  const parsed = Date.parse(timeStr)
  const time = new Date(parsed)
  return `${PadZero(time.getHours())}:${PadZero(time.getMinutes())}`
}

export default Dashboard