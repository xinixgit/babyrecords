import GiantButton from '../components/GiantButton'
import { useNavigate } from "react-router-dom";

interface Props {
  onClick: (name: string) => void;
}

export default function PageHome({ onClick }: Props) {
  const navigate = useNavigate();

  const handleClick = (name: string) => {
    onClick(name);
    navigate("/" + name);
  }

  return (
    <div className="giant-font">
      <div className="row align-items-center justify-content-center">
        <div className="col col-8">
          <GiantButton name='喂奶' styleClass='btn-primary' onClick={() => { handleClick('feed'); }} />
        </div>
      </div>
      <div className="row align-items-center justify-content-center">
        <div className="col col-8">
          <GiantButton name='睡眠' styleClass='btn-info' onClick={() => { handleClick('sleep'); }} />
        </div>
      </div>
      <div className="row align-items-center justify-content-center">
        <div className="col col-8">
          <GiantButton name='尿布' styleClass='btn-warning' onClick={() => { handleClick('diaper'); }} />
        </div>
      </div>
    </div>
  )
}