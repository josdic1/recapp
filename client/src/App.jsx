// src/App.jsx
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import CategoryProvider from './providers/CategoryProvider'
import RecipeProvider from './providers/RecipeProvider'  
import UserProvider from './providers/UserProvider'
import './App.css'

function App() {
  return (
    <>
    <UserProvider>
    <CategoryProvider>

    <RecipeProvider>

    <header>
    <NavBar />
    </header>
  <main>
    <Outlet />
  </main>
  
   </RecipeProvider>
      </CategoryProvider>
    </UserProvider>
    </>
  )
}

export default App