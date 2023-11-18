import { useNavigate } from "react-router-dom";
import TimeInputForm from '../components/TimeInputForm'
import { UpdateSleepRecordEndTime } from '../http/Api';
import { SUCCESS } from '../Model'
import { SleepRecord, UpdateSleepRecordRequest } from '../http/HttpModel';

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
      <TimeInputForm onSubmit={onSubmit} />
    </>
  )
}

export default SleepEnd