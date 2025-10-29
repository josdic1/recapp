import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TestPage from "./pages/TestPage";
import DashboardPage from "./pages/DashboardPage";
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