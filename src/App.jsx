import Weather from "./components/Weather.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
		<div className='bg-gradient-to-r from-indigo-200 to-yellow-100 grid py-4 min-h-screen'>
			<Weather />
			{/* Toast */}
			<ToastContainer />
		</div>
	);
}
