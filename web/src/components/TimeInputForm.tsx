import Form from '../components/Form'
import TimeInput from '../components/TimeInput';

interface Props {
  onSubmit: (time: Date) => void
}

const TimeInputForm = ({ onSubmit }: Props) => {
  const time: Date = new Date()
  const handleTimeChange = (t: Date) => {
    time.setHours(t.getHours())
    time.setMinutes(t.getMinutes())
    time.setSeconds(t.getSeconds())
  }

  const onFormSubmit = () => {
    onSubmit(time)
  }

  return (
    <Form btnName="提交" btnStyleClass='btn-primary' onSubmit={onFormSubmit}>
      <TimeInput handleTimeChange={handleTimeChange} />
    </Form>
  )
}

export default TimeInputForm