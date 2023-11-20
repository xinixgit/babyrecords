import { useState } from 'react';
import Form from '../components/Form'
import TimeInput from '../components/TimeInput';

interface Props {
  onSubmit: (time: Date) => void
}

const TimeInputForm = ({ onSubmit }: Props) => {
  const [inputTime, setInputTime] = useState(new Date())
  const [hasChanged, setChanged] = useState(false)

  const handleTimeInputChange = (time: Date) => {
    setInputTime(time)
    if (!hasChanged) {
      setChanged(true)
    }
  }

  const onFormSubmit = () => {
    onSubmit(inputTime)
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' readyToSubmit={hasChanged} onSubmit={onFormSubmit}>
      <TimeInput
        handleTimeInputChange={handleTimeInputChange}
      />
    </Form>
  )
}

export default TimeInputForm