import Time from './Time'
import PageSleepEndTime from './SleepEnd'
import { useState, useEffect } from 'react';
import { GetLatestSleepRecord } from '../http/Api'
import AlertBox from '../components/AlertBox';
import { AM, PM } from '../Model'
import { PadZero } from "../components/Util";

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
      {dataLoaded && sleepRecord.start_time != "" && <AlertBox message={'睡眠开始: ' + parseStartTime(sleepRecord?.start_time)} />}
      {dataLoaded && sleepRecord.start_time != "" && <PageSleepEndTime sleepRecord={sleepRecord} />}
    </>
  )
}

function parseStartTime(startTime: string): string {
  if (typeof startTime === 'undefined') {
    return ""
  }

  const epoch = Date.parse(startTime)
  const time = new Date(epoch)
  const hr = time.getHours()
  const amPm = hr < 12 ? AM : PM
  return PadZero(hr > 12 ? hr % 12 : hr) + ':' + PadZero(time.getMinutes()) + ' ' + amPm
}

export default SleepStart