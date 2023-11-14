import { ChangeEvent } from 'react';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
import { AM, PM } from '../Model'

interface Props {
  handleTimeChange: (ts: Date) => void
}

const TimeInput = ({ handleTimeChange }: Props) => {
  const inputs = [
    {
      val: AM,
      txt: '上午'
    },
    {
      val: PM,
      txt: '下午'
    }
  ]

  const currDate = new Date()
  let amPm = AM

  const handleHrChange = (hrStr: string) => {
    if (hrStr === "") {
      return
    }

    let hr = parseInt(hrStr)
    if (hr < 12 && amPm === PM) {
      hr += 12
    }

    currDate.setHours(hr)
    handleTimeChange(currDate)
  }

  const handleMinChange = (minStr: string) => {
    if (minStr === "") {
      return
    }

    const min = parseInt(minStr)
    currDate.setMinutes(min)
    handleTimeChange(currDate)
  }

  const handleAmPmChange = (e: ChangeEvent<HTMLSelectElement>) => {
    amPm = e.target.value
    if (currDate.getHours() < 12 && amPm === PM) {
      currDate.setHours(currDate.getHours() + 12)
    }
    handleTimeChange(currDate)
  }

  return (
    <>
      <NumberInput label="点" handleChange={handleHrChange} />
      <NumberInput label="分" handleChange={handleMinChange} />
      <SelectInput handleChange={handleAmPmChange} items={inputs} />
    </>
  )
}

export default TimeInput