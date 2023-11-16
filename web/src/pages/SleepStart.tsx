import Time from './Time'
import PageSleepEndTime from './SleepEnd'
import { useState, useEffect } from 'react';
import { GetLatestSleepRecord } from '../http/Api'

const SleepStart = () => {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [sleepRecord, setSleepRecord] = useState({ start_time: '' })

  useEffect(() => {
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
  }, [setDataLoaded])

  return (
    <>
      {dataLoaded && sleepRecord.start_time === "" && <Time />}
      {dataLoaded && sleepRecord.start_time != "" && <PageSleepEndTime sleepRecord={sleepRecord} />}
    </>
  )
}

export default SleepStart