import Form from '../components/Form'
import NumberInput from '../components/NumberInput';

const PageFeed = () => {
  return (
    <Form btnName="提交" btnStyleClass='btn-primary' btnOnClick={() => { }}>
      <NumberInput label="毫升" />
    </Form>
  )
}

export default PageFeed;