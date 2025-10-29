import App from "./App";
import ErrorPage from "./pages/HomePage";
import HomePage from "./pages/HomePage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
        }]
    },
];

export default routes