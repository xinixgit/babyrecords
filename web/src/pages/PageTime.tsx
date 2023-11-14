import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import TimeInputForm from '../components/TimeInputForm'
import { CurrentContext } from '../App';
import { SaveRecord } from '../http/Api';
import { SUCCESS } from '../Model'

const PageTime = () => {
  const navigate = useNavigate()
  const ctx = useContext(CurrentContext);

  const onSubmit = (time: Date) => {
    ctx.time = time.toISOString()
    SaveRecord(ctx, () => navigate("/ack?status=" + SUCCESS))
  }

  return (
    <TimeInputForm onSubmit={onSubmit} />
  )
}

export default PageTime