import { ChangeEvent } from 'react';
import Form from '../components/Form'
import TimeInput from '../components/TimeInput';

const PageSleep = () => {
  const handleHrChange = (val: string) => {
    console.log(val)
  }
  const handleMinChange = (val: string) => {
    console.log(val)
  }
  const handleAmPmChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e)
  }
  const onSubmit = () => {
    console.log('')
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' onSubmit={onSubmit}>
      <TimeInput handleHrChange={handleHrChange} handleMinChange={handleMinChange} handleAmPmChange={handleAmPmChange} />
    </Form>
  )
}

export default PageSleep