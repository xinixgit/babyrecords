import { ChangeEvent, useState } from 'react';
import SelectInput from './SelectInput';
import { AM, PM } from '../Model'
import { PadZero } from './Util'

interface Props {
  handleTimeInputChange: (time: Date) => void
}

const TimeInput = ({ handleTimeInputChange }: Props) => {
  const hrInputs = []
  for (let i = 1; i <= 12; i++) {
    hrInputs.push({
      val: i + '',
      txt: PadZero(i)
    })
  }

  const minInputs = []
  for (let i = 0; i < 60; i += 5) {
    minInputs.push({
      val: i + '',
      txt: PadZero(i)
    })
  }

  const amPmInputs = [
    {
      val: AM,
      txt: '上午'
    },
    {
      val: PM,
      txt: '下午'
    }
  ]

  const now = new Date()
  const defaultTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    parseInt(hrInputs[0].val),
    parseInt(minInputs[0].val)
  )

  const [inputTime, setInputTime] = useState(defaultTime)
  const [amPm, setAmPm] = useState(AM)

  const handleHrChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let hr = parseInt(e.target.value)
    if (hr < 12 && amPm === PM) {
      hr += 12
    }

    const time = new Date(
      inputTime.getFullYear(),
      inputTime.getMonth(),
      inputTime.getDate(),
      hr,
      inputTime.getMinutes()
    )
    setInputTime(time)
    if (hr == 12) {
      setAmPm(PM)
    }
    handleTimeInputChange(time)
  }

  const handleMinChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const min = parseInt(e.target.value)
    const time = new Date(
      inputTime.getFullYear(),
      inputTime.getMonth(),
      inputTime.getDate(),
      inputTime.getHours(),
      min
    )
    setInputTime(time)
    handleTimeInputChange(time)
  }

  const handleAmPmChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const amPmInput = e.target.value
    setAmPm(amPmInput)

    let time: Date
    if (amPmInput === AM) {
      time = new Date(
        inputTime.getFullYear(),
        inputTime.getMonth(),
        inputTime.getDate(),
        inputTime.getHours() % 12,
        inputTime.getMinutes()
      )
    } else {
      time = new Date(
        inputTime.getFullYear(),
        inputTime.getMonth(),
        inputTime.getDate(),
        inputTime.getHours() % 12 + 12,
        inputTime.getMinutes()
      )
    }

    setInputTime(time)
    handleTimeInputChange(time)
  }

  return (
    <>
      <SelectInput handleChange={handleHrChange} items={hrInputs} label='时' />
      <SelectInput handleChange={handleMinChange} items={minInputs} label='分' />
      <SelectInput handleChange={handleAmPmChange} items={amPmInputs} selected={amPm} />
    </>
  )
}

export default TimeInput