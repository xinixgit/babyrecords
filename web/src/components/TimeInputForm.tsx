import Form from '../components/Form'
import TimeInput from '../components/TimeInput';

interface Props {
  onSubmit: (time: Date) => void
}

const TimeInputForm = ({ onSubmit }: Props) => {
  const onFormSubmit = () => {
    onSubmit(time)
  }

  let time: Date
  const handleTimeChange = (t: Date) => {
    time = t
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' onSubmit={onFormSubmit}>
      <TimeInput handleTimeChange={handleTimeChange} />
    </Form>
  )
}

export default TimeInputForm