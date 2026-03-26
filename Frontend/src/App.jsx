import { RouterProvider } from 'react-router'
import {router} from './app.routes'
import './shared/globel.scss'

const App = () => {
  return (
    <RouterProvider router={router} />
     
  )
}

export default App