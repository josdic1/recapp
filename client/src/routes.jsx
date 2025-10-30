import App from "./App";
// import CategoryForm from "./components/CategoryForm";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TestPage from "./pages/TestPage";
import DashboardPage from "./pages/DashboardPage";
import RecipeCardPage from "./pages/RecipeCardPage";
import RecipeFormNew from "./components/RecipeFormNew";
import RecipeFormEdit from "./components/RecipeFormEdit";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            // {
            //     path: "categories/new",
            //     element: (
            //     <ProtectedRoute>
            //         <CategoryForm />
            //     </ProtectedRoute>
            //     )
            // },
                  {
                path: "recipes/new",
                element: (
                <ProtectedRoute>
                    <RecipeFormNew />
                </ProtectedRoute>
                )
            },
                  {
                path: "recipes/:id/edit",
                element: (
                <ProtectedRoute>
                    <RecipeFormEdit />
                </ProtectedRoute>
                )
            },
               {
                path: "recipes/:id",
                element: (
                <ProtectedRoute>
                    <RecipeCardPage />
                </ProtectedRoute>
                )
            },
            {
                path: "test",
                element: <TestPage />
            },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                )
            }
        ]
    },
];

export default routes;