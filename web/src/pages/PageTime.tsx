import Form from '../components/Form'
import TimeInput from '../components/TimeInput';
import { useContext } from 'react';
import { CurrentContext } from '../App';

const PageTime = () => {
  const req = useContext(CurrentContext);

  let hr: string, min: string, amPm: string;
  const handleHrChange = (val: string) => { hr = val }
  const handleMinChange = (val: string) => { min = val }
  const handleAmPmChange = (val: string) => { amPm = val }

  const onSubmit = () => {
    req.feedTime = hr + ':' + min + ' ' + amPm
    console.log('submit request: ' + JSON.stringify(req))
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' onSubmit={onSubmit}>
      <TimeInput handleAmPmChange={handleAmPmChange} handleHrChange={handleHrChange} handleMinChange={handleMinChange} />
    </Form>
  )
}

export default PageTime