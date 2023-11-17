import { useNavigate } from "react-router-dom";
import TimeInputForm from '../components/TimeInputForm'
import { UpdateSleepRecordEndTime } from '../http/Api';
import { SUCCESS } from '../Model'
import { SleepRecord, UpdateSleepRecordRequest } from '../http/HttpModel';
import { AM, PM } from '../Model'
import { PadZero } from "../components/Util";

interface Props {
  sleepRecord: SleepRecord
}

const SleepEnd = ({ sleepRecord }: Props) => {
  const navigate = useNavigate()

  const onSubmit = (time: Date) => {
    const sleepEndTime = time.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    const newSleepRecord: SleepRecord = {
      id: sleepRecord.id,
      start_time: sleepRecord.start_time,
      end_time: sleepEndTime
    }
    const req: UpdateSleepRecordRequest = {
      sleep_record: newSleepRecord
    }
    UpdateSleepRecordEndTime(req, () => navigate("/ack?status=" + SUCCESS))
  }

  return (
    <>
      <div className="row g-3 align-items-center justify-content-center">
        <div className="col-7 giant-font">
          <div className="alert alert-dark" role="alert">
            睡眠开始: {parseStartTime(sleepRecord?.start_time)}
          </div>
        </div>
      </div>
      <TimeInputForm onSubmit={onSubmit} />
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

export default SleepEnd