import { ReactNode } from 'react'
import GiantButton from './GiantButton'

interface Props {
  children: ReactNode;
  btnName: string;
  btnStyleClass: string;
  readyToSubmit: boolean
  onSubmit: () => void;
}

const Form = ({ children, btnName, btnStyleClass, readyToSubmit, onSubmit }: Props) => {
  return (
    <div className="giant-font stdform">
      {children}
      {
        readyToSubmit &&
        <div className="row align-items-center justify-content-center">
          <div className="col col-8">
            <GiantButton name={btnName} styleClass={btnStyleClass} onClick={onSubmit} />
          </div>
        </div>
      }
    </div>
  )
}

export default Form