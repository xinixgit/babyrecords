import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
import { AM, PM } from '../Model'

interface Props {
  handleHrChange: (val: string) => void
  handleMinChange: (val: string) => void
  handleAmPmChange: (val: string) => void
}

const TimeInput = ({ handleHrChange, handleMinChange, handleAmPmChange }: Props) => {
  const amPm = [
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
      <SelectInput handleChange={handleAmPmChange} items={amPm} />
    </>
  )
}

export default TimeInput