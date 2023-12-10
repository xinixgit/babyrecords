import './App.css'

import { createContext } from 'react';
import { AuthProvider } from 'react-auth-kit'
import { Context } from './Model'
import { RefreshApi } from './http/AuthApi'
import NavBar from './components/NavBar'
import RouteComponents from './RouteComponents'

const emptyContext: Context = {
  type: '',
  subtype: '',
  unit: '',
  vol: 0,
  time: ''
}

export const CurrentContext = createContext(emptyContext);

function App() {
  return (
    <div className="container text-center babyrecord-container">
      <NavBar />
      <AuthProvider
        authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}
        refresh={RefreshApi}
      >
        <CurrentContext.Provider value={emptyContext}>
          <RouteComponents />
        </CurrentContext.Provider>
      </AuthProvider>
    </div>
  )
}

export default App
