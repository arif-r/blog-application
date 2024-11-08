import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Header, Footer } from './components'
import {Outlet} from 'react-router-dom'

function App() {
  const [isLoading , setIsLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) dispatch(login(userData))
        else dispatch(logout())
      })
      .finally(() => setIsLoading(false))
  }, [] )

  return isLoading ? (null) : (
    <div className='min-h-screen flex-wrap flex content-between bg-gray-600'>
      <div className='w-full block'>
          <Header />
          <main>
           TODO :  {/* <outlet /> */}
          </main>
          <Footer />
      </div>
    </div>
  )
}

export default App
