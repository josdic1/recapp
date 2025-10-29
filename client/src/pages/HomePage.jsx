// src/pages/HomePage.jsx
import { BugOffIcon } from "lucide-react"
import UserDebug from "../components/UserDebug"
import CategoryDebug from "../components/CategoryDebug"
// import RecipeDebug from "../components/RecipeDebug"  // Commented for now

function HomePage() {
    return (
        <>
            <h1><BugOffIcon size={48} strokeWidth={2} className="my-icon" /></h1>
            <UserDebug />
            <CategoryDebug />
            {/* <RecipeDebug /> */}
        </>
    )
}

export default HomePage