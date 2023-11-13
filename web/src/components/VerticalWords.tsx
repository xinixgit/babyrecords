interface Props {
  words: string[]
  textClass?: string
}

const VerticalWords = ({ words, textClass }: Props) => {
  return (
    <div className="giant-font">
      {
        words.map((word) => (
          <div key={word} className="row align-items-center justify-content-center medium-square">
            <div className={"col col-8 " + textClass}>
              {word}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default VerticalWords