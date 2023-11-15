import { ChangeEvent, useState } from 'react';
import Form from '../components/Form'
import TimeInput from '../components/TimeInput';
import { AM, PM } from '../Model'

interface Props {
  onSubmit: (time: Date) => void
}

const TimeInputForm = ({ onSubmit }: Props) => {
  const [hr, setHour] = useState(0)
  const [min, setMin] = useState(0)
  const [amPm, setAmPm] = useState(AM)

  const handleHrChange = (hrStr: string) => {
    if (hrStr === "") {
      return
    }

    let _hr = parseInt(hrStr)
    if (_hr < 12 && amPm === PM) {
      _hr += 12
    }

    setHour(_hr)
  }

  const handleMinChange = (minStr: string) => {
    if (minStr === "") {
      return
    }

    const _min = parseInt(minStr)
    setMin(_min)
  }

  const handleAmPmChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const _amPm = e.target.value
    if (hr < 12 && _amPm === PM) {
      setHour(hr + 12)
    } else if (hr > 12 && _amPm === AM) {
      setHour(hr - 12)
    }
    setAmPm(_amPm)
  }

  const onFormSubmit = () => {
    const timeInput = new Date()
    timeInput.setHours(hr)
    timeInput.setMinutes(min)
    onSubmit(timeInput)
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' onSubmit={onFormSubmit}>
      <TimeInput
        handleHrChange={handleHrChange}
        handleMinChange={handleMinChange}
        handleAmPmChange={handleAmPmChange}
      />
    </Form>
  )
}

export default TimeInputForm