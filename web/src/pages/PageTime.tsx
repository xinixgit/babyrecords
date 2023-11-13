import { useContext, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import Form from '../components/Form'
import TimeInput from '../components/TimeInput';
import { CurrentContext } from '../App';
import { SaveRecord } from '../http/Api';
import { PM, SUCCESS } from '../Model'

const PageTime = () => {
  const navigate = useNavigate()
  const ctx = useContext(CurrentContext);

  let hr: string, min: string, amPm: string;
  const handleHrChange = (val: string) => { hr = val }
  const handleMinChange = (val: string) => { min = val }
  const handleAmPmChange = (e: ChangeEvent<HTMLSelectElement>) => { amPm = e.target.value }

  const onSubmit = () => {
    ctx.time = toISOTime(hr, min, amPm)
    SaveRecord(ctx, () => navigate("/ack?status=" + SUCCESS))
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' onSubmit={onSubmit}>
      <TimeInput handleAmPmChange={handleAmPmChange} handleHrChange={handleHrChange} handleMinChange={handleMinChange} />
    </Form>
  )
}

function toISOTime(hrStr: string, minStr: string, amPm: string): string {
  let hr = parseInt(hrStr)
  const min = parseInt(minStr)
  if (amPm === PM) {
    hr += 12
  }

  const currDate = new Date()
  return new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), hr, min, 0).toISOString()
}

export default PageTime