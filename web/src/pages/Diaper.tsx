import { ChangeEvent, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { No1, No2 } from '../Model'
import { CurrentContext } from '../App';
import Form from '../components/Form'
import SelectInput from '../components/SelectInput';

const Diaper = () => {
  const navigate = useNavigate()
  const ctx = useContext(CurrentContext)
  const items = [
    {
      val: No1,
      txt: No1
    },
    {
      val: No2,
      txt: No2
    }
  ]

  let input: string

  const handleClick = () => {
    ctx.diaperSize = input || items[0].val
    navigate("/time")
  }

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    input = e.target.value
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' onSubmit={handleClick}>
      <SelectInput handleChange={handleInputChange} items={items} />
    </Form>
  )
}

export default Diaper