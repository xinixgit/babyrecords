interface Props {
  name: string;
  styleClass: string;
  onClick: () => void;
}

const GiantButton = ({ name, styleClass, onClick }: Props) => {
  return (
    <button
      type="button"
      className={"giant-square btn " + styleClass}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default GiantButton