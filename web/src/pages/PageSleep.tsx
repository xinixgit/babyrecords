import PageTime from './PageTime'
import PageSleepEndTime from './PageSleepEndTime'
import { useState } from 'react';
import { GetLatestSleepRecord } from '../http/Api'

const PageSleepStart = () => {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [sleepRecord, setSleepRecord] = useState({ start_time: '' })

  GetLatestSleepRecord((data) => {
    const end_time = data?.sleep_record?.end_time
    if (end_time === "") {
      const startTime = data?.sleep_record?.start_time
      if (startTime != "") {
        const rec = data?.sleep_record
        if (typeof rec !== 'undefined') {
          setSleepRecord(rec)
        }
      }
    }
    setDataLoaded(true)
  })

  return (
    <>
      {dataLoaded && sleepRecord.start_time === "" && <PageTime />}
      {dataLoaded && sleepRecord.start_time != "" && <PageSleepEndTime sleepRecord={sleepRecord} />}
    </>
  )
}

export default PageSleepStart