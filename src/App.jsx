// import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EquipmentProvider } from './context/EquipmentContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import DashboardPage from './features/dashboard/DashboardPage';
import ProjectsPage from './features/projects/ProjectsPage';
import ResearchersPage from './features/researchers/ResearchersPage';
import AuthRegister from './features/registrations/RegisterPage';
import AuthLogin from './features/logins/LoginPage';
import SettingsPage from './features/settings/SettingsPage';
import EquipmentPage from './features/equipments/EquipmentPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<Router>
			<div className='flex flex-col h-screen'>
				<AuthProvider>
					<Navbar />

					<main className='flex-1 transition-all duration-300'>
						<Routes>
							<Route path='/' element={<AuthLogin />} />
							<Route path='/register' element={<AuthRegister />} />
							<Route path='/dashboard' element={<DashboardPage />} />
							<Route path='/projects' element={<ProjectsPage />} />
							<Route path='/researchers' element={<ResearchersPage />} />
							<Route path='/settings' element={<SettingsPage />} />
							<Route
								path='/equipments'
								element={
									<EquipmentProvider>
										<EquipmentPage />
									</EquipmentProvider>
								}
							/>
						</Routes>
					</main>
				</AuthProvider>

				<Footer />
			</div>
			<ScrollToTop />

			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</Router>
	);
};

export default App;

