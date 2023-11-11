import GiantButton from '../components/GiantButton'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { CurrentContext } from '../App';

export default function PageHome() {
  const navigate = useNavigate();
  const req = useContext(CurrentContext);

  const handleClick = (name: string) => {
    req.recType = name;
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