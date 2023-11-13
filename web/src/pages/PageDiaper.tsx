import { ChangeEvent, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { S, M, L } from '../Model'
import { CurrentContext } from '../App';
import Form from '../components/Form'
import SelectInput from '../components/SelectInput';

const PageDiaper = () => {
  const navigate = useNavigate()
  const ctx = useContext(CurrentContext)
  const items = [
    {
      val: S,
      txt: "小"
    },
    {
      val: M,
      txt: "中"
    },
    {
      val: L,
      txt: "大"
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

export default PageDiaper