const NavBar = () => {
  return (
    <ul className="nav justify-content-center giant-font">
      <li className="nav-item">
        <a className="nav-link" aria-current="page" href="/">主页</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" aria-current="page" href="/#/dashboard">总览</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" aria-current="page" href="/#/feedpumpsummary">奶量历史</a>
      </li>
    </ul>
  )
}

export default NavBar