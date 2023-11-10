import { useState } from "react";

export default function ListGroup() {
  const items = ["A", "B", "C", "D", "E"]
  const [selectedIndex, setSelectedIndex] = useState(-1)

  return (
    <>
      <h1>List</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={"list-group-item " + (selectedIndex === index ? 'active' : '')}
            onClick={() => { setSelectedIndex(index); }}
          >
            {item}
          </li>
        ))}
      </ul >
    </>
  )
}