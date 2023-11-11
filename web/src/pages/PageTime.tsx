import Form from '../components/Form'
import TimeInput from '../components/TimeInput';
import { useContext } from 'react';
import { CurrentContext } from '../App';
import { SaveRecord } from '../http/Api';

const PageTime = () => {
  const ctx = useContext(CurrentContext);

  let hr: string, min: string, amPm: string;
  const handleHrChange = (val: string) => { hr = val }
  const handleMinChange = (val: string) => { min = val }
  const handleAmPmChange = (val: string) => { amPm = val }

  const onSubmit = () => {
    ctx.time = hr + ':' + min + ' ' + amPm
    SaveRecord(ctx)
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' onSubmit={onSubmit}>
      <TimeInput handleAmPmChange={handleAmPmChange} handleHrChange={handleHrChange} handleMinChange={handleMinChange} />
    </Form>
  )
}

export default PageTime