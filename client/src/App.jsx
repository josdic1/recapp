// src/App.jsx
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import CategoryProvider from './providers/CategoryProvider'
import RecipeProvider from './providers/RecipeProvider'  // Keep the import
import UserProvider from './providers/UserProvider'
import './App.css'

function App() {
  return (
    <>
    <UserProvider>
    <CategoryProvider>
    {/* Commented out for now - we'll add back later */}
    {/* <RecipeProvider> */}

    <header>
    <NavBar />
    </header>
  <main>
    <Outlet />
  </main>
  
   {/* </RecipeProvider> */}
      </CategoryProvider>
    </UserProvider>
    </>
  )
}

export default App