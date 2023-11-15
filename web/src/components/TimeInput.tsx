import { ChangeEvent } from 'react';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
import { AM, PM } from '../Model'

interface Props {
  handleHrChange: (hr: string) => void
  handleMinChange: (min: string) => void
  handleAmPmChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const TimeInput = ({ handleHrChange, handleMinChange, handleAmPmChange }: Props) => {
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

  return (
    <>
      <NumberInput label="点" handleChange={handleHrChange} />
      <NumberInput label="分" handleChange={handleMinChange} />
      <SelectInput handleChange={handleAmPmChange} items={inputs} />
    </>
  )
}

export default TimeInput