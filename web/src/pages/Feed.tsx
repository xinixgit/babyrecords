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

  const [feedType, setFeedType] = useState(feedInputs[0].val)
  const [vol, setVol] = useState('')
  const [label, setLabel] = useState(feedLabels[0])
  const [hasChanged, setChanged] = useState(false)

  const handleClick = () => {
    ctx.subtype = feedType
    ctx.vol = parseInt(vol)
    ctx.unit = label
    navigate("/time")
  }

  const handleVolChange = (vol: string) => {
    setVol(vol)
    if (!hasChanged && parseInt(vol) > 0) {
      setChanged(true)
    }
  }

  const handleFeedTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const idx = e.target.selectedIndex
    setFeedType(feedInputs[idx].val)
    setLabel(feedLabels[idx])
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' readyToSubmit={hasChanged} onSubmit={handleClick}>
      <SelectInput handleChange={handleFeedTypeChange} items={feedInputs} />
      <NumberInput label={label} handleChange={handleVolChange} />
    </Form>
  )
}

export default Feed;