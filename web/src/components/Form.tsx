import { ReactNode } from 'react'
import GiantButton from './GiantButton'

interface Props {
  children: ReactNode;
  btnName: string;
  btnStyleClass: string;
  btnOnClick: () => void;
}

const Form = ({ children, btnName, btnStyleClass, btnOnClick }: Props) => {
  return (
    <div className="giant-font stdform">
      {children}
      <div className="row align-items-center justify-content-center">
        <div className="col col-8">
          <GiantButton name={btnName} styleClass={btnStyleClass} onClick={btnOnClick} />
        </div>
      </div>
    </div>
  )
}

export default Form