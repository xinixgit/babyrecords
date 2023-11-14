import GiantButton from '../components/GiantButton'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { CurrentContext } from '../App';
import { RecordTypeFeed, RecordTypeSleep, RecordTypeDiaper } from '../Model';

export default function HomePage() {
  const navigate = useNavigate();
  const ctx = useContext(CurrentContext);

  const handleClick = (type: string) => {
    ctx.type = type;
    navigate("/" + type);
  }

  return (
    <div className="giant-font">
      <div className="row align-items-center justify-content-center">
        <div className="col col-8">
          <GiantButton name='喂奶' styleClass='btn-primary' onClick={() => { handleClick(RecordTypeFeed); }} />
        </div>
      </div>
      <div className="row align-items-center justify-content-center">
        <div className="col col-8">
          <GiantButton name='睡眠' styleClass='btn-info' onClick={() => { handleClick(RecordTypeSleep); }} />
        </div>
      </div>
      <div className="row align-items-center justify-content-center">
        <div className="col col-8">
          <GiantButton name='尿布' styleClass='btn-warning' onClick={() => { handleClick(RecordTypeDiaper); }} />
        </div>
      </div>
    </div>
  )
}