import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Form from '../components/Form'
import TimeInput from '../components/TimeInput';
import { CurrentContext } from '../App';
import { SaveRecord } from '../http/Api';
import { SUCCESS } from '../Model'

const PageTime = () => {
  const navigate = useNavigate()
  const ctx = useContext(CurrentContext);

  let selectedTime: Date
  const handleTimeChange = (ts: Date) => {
    selectedTime = ts
    console.log(selectedTime)
  }

  const onSubmit = () => {
    ctx.time = selectedTime.toISOString()
    console.log(ctx)
    SaveRecord(ctx, () => navigate("/ack?status=" + SUCCESS))
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' onSubmit={onSubmit}>
      <TimeInput handleTimeChange={handleTimeChange} />
    </Form>
  )
}

export default PageTime