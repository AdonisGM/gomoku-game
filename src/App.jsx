import './App.css'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import Welcome from "./pages/welcomePage/Welcome.jsx";
import Cookies from "js-cookie";
import MainLayout from "./layout/MainLayout.jsx";
import Auth from "./components/auth/Auth.jsx";
import Test from "./pages/testPage/Test.jsx";
import ErrorBoundary from "./pages/errorPage/ErrorBoundary.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import GamePage from "./pages/GamePage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Welcome/>,
	},
	{
		path: "/",
		element: <Auth><MainLayout/></Auth>,
		children: [
			{
				path: "/dashboard",
				element: <DashboardPage/>,
			}
		]
	},
	{
		path: "/game",
		element: <GamePage/>,
		errorElement: <ErrorBoundary/>
	},
	{
		path: "*",
		element: <p>404</p>,
	}
]);

function App() {
	useEffect(() => {
		if (Cookies.get('info')) {
			try {
				const info = Cookies.get('info');
				localStorage.setItem('username', info);
			} catch (e) {
				console.log(e)
				Cookies.remove('info', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
				window.location.href = '/';
			}
		}

		if (!Cookies.get('info')) {
			localStorage.removeItem('username');
		}
	}, []);

	return (
		<div>
			<RouterProvider router={router}/>
			<Toaster
				toastOptions={{
					className: 'bg-default-900 text-white text-sm',
				}}
				position="top-right"
			/>
		</div>
	)
}

export default App
