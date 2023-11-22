import { useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { CurrentContext } from '../App';
import Form from '../components/Form'
import NumberInput from '../components/NumberInput';

const Pump = () => {
  const navigate = useNavigate()
  const ctx = useContext(CurrentContext)
  const [hasChanged, setChanged] = useState(false)

  const handleVolChange = (volStr: string) => {
    const vol = parseInt(volStr)
    ctx.vol = vol
    if (!hasChanged && vol > 0) {
      setChanged(true)
    }
  }

  const handleClick = () => {
    navigate("/time")
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' readyToSubmit={hasChanged} onSubmit={handleClick}>
      <NumberInput label="毫升" handleChange={handleVolChange} />
    </Form>
  )
}

export default Pump