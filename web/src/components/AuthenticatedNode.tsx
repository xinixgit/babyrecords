import { ReactNode, useEffect } from 'react'
import { useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const AuthenticatedNode = ({ children }: Props) => {
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signin')
      return
    }
  }, [isAuthenticated, navigate])

  return (
    <div>{children}</div>
  )
}

export default AuthenticatedNode