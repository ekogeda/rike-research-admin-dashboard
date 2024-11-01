import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LogoSVG from '../assets/research_connect_logo.svg';
import NotificationSVG from '../assets/notification.svg';
import ProfileSVG from '../assets/profile.svg';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user } = useContext(AuthContext);
	// const { user, logout } = useContext(AuthContext);
	const userData = user?.user;
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) navigate('/');
	}, [user, navigate]);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<nav className='flex items-center justify-between bg-white shadow-md p-4 w-full'>
			<div className='flex items-center space-x-6'>
				<button className='lg:hidden' onClick={toggleMenu}>
					<svg
						className='w-6 h-6 text-gray-700'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
					</svg>
				</button>

				<div className=''>
					<img src={LogoSVG} alt='Logo' className='h-8 mr-6' />
				</div>

				<div className='hidden lg:flex space-x-6 ml-8'>
					<Link to='/dashboard' className='text-gray-700 hover:text-blue-600'>
						Home
					</Link>
					<Link to='/discovery' className='text-gray-700 hover:text-blue-600'>
						Discovery
					</Link>
					<Link to='/equipments' className='text-gray-700 hover:text-blue-600'>
						Equipment
					</Link>
					<Link to='/products' className='text-gray-700 hover:text-blue-600'>
						Products
					</Link>
					<Link to='/publications' className='text-gray-700 hover:text-blue-600'>
						Publications
					</Link>
					<Link to='/research-units' className='text-gray-700 hover:text-blue-600'>
						Research Units
					</Link>
				</div>
			</div>

			<div className='flex items-center space-x-2 md:space-x-4'>
				<button className='relative'>
					<img src={NotificationSVG} alt='Bell' className='h-6' />
					<span className='absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 bg-red-500 rounded-full'></span>
				</button>
				<div className='flex items-center gap-1'>
					<img src={ProfileSVG} alt='Profile Avatar' className='h-6 w-8 rounded-full' />{' '}
					<span className='text-[#075438] font-semibold'>{userData?.firstName}</span>
				</div>
			</div>

			{isMenuOpen && (
				<div className='fixed inset-0 z-40 bg-gray-800 bg-opacity-75 flex justify-start transition-opacity duration-300 ease-in-out'>
					<div
						className={`bg-white w-64 h-full shadow-lg p-4 transform transition-transform duration-300 ease-in-out z-10 ${
							isMenuOpen ? 'translate-x-0' : 'translate-x-full'
						}`}
					>
						<div className='flex justify-end'>
							<button className='text-gray-700' onClick={closeMenu}>
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
								</svg>
							</button>
						</div>
						<div className='mt-4 space-y-4'>
							<Link to='/dashboard' className='block text-gray-700 hover:text-blue-600' onClick={closeMenu}>
								Home
							</Link>
							<Link to='/discovery' className='block text-gray-700 hover:text-blue-600' onClick={closeMenu}>
								Discovery
							</Link>
							<Link to='/equipments' className='block text-gray-700 hover:text-blue-600' onClick={closeMenu}>
								Equipment
							</Link>
							<Link to='/products' className='block text-gray-700 hover:text-blue-600' onClick={closeMenu}>
								Products
							</Link>
							<Link to='/publications' className='block text-gray-700 hover:text-blue-600' onClick={closeMenu}>
								Publications
							</Link>
							<Link to='/research-units' className='block text-gray-700 hover:text-blue-600' onClick={closeMenu}>
								Research Units
							</Link>
						</div>
					</div>
					<div className='absolute inset-0' onClick={closeMenu} />
				</div>
			)}
		</nav>
	);
};

export default Navbar;
