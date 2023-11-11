import Form from '../components/Form'
import NumberInput from '../components/NumberInput';
import SelectInput from '../components/SelectInput';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { CurrentContext } from '../App';

const PageFeed = () => {
  const navigate = useNavigate()
  const req = useContext(CurrentContext)

  let input: string, feedType: string;

  const handleClick = () => {
    req.feedVol = parseInt(input)
    req.feedType = feedType
    navigate("/time")
  }

  const handleVolChange = (val: string) => {
    input = val
  }

  const handleFeedTypeChange = (val: string) => {
    feedType = val
  }

  const feedTypes = [
    {
      val: 'milk',
      txt: '奶'
    },
    {
      val: 'babyfood',
      txt: '辅食'
    }
  ]

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' onSubmit={handleClick}>
      <SelectInput handleChange={handleFeedTypeChange} items={feedTypes} />
      <NumberInput label="毫升" handleChange={handleVolChange} />
    </Form>
  )
}

export default PageFeed;