import { ChangeEvent } from 'react';
import Form from '../components/Form'
import NumberInput from '../components/NumberInput';
import SelectInput from '../components/SelectInput';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { CurrentContext } from '../App';

const feedInputs = [
  {
    val: 'milk',
    txt: '奶'
  },
  {
    val: 'babyfood',
    txt: '辅食'
  }
]

const feedLabels = [
  '毫升',
  '克'
]

const Feed = () => {
  const navigate = useNavigate()
  const ctx = useContext(CurrentContext)
  const [input, setInput] = useState({
    type: feedInputs[0].val,
    vol: ""
  })
  const [label, setLabel] = useState(feedLabels[0])

  const handleClick = () => {
    ctx.feedVol = parseInt(input.vol)
    ctx.feedType = input.type
    ctx.feedUnit = label
    navigate("/time")
  }

  const handleVolChange = (vol: string) => {
    input.vol = vol
    setInput(input)
  }

  const handleFeedTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const idx = e.target.selectedIndex
    input.type = feedInputs[idx].val
    setInput(input)
    setLabel(feedLabels[idx])
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' onSubmit={handleClick}>
      <SelectInput handleChange={handleFeedTypeChange} items={feedInputs} />
      <NumberInput label={label} handleChange={handleVolChange} />
    </Form>
  )
}

export default Feed;