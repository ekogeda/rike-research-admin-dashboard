import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<div className='fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg'>
			<div className='p-4'>
				<h2 className='text-xl font-bold'>Admin Dashboard</h2>
				<nav className='mt-4'>
					<ul>
						<li className='mb-2'>
							<Link to='/dashboard' className='block text-gray-700 hover:bg-gray-200 p-2 rounded'>
								Dashboard
							</Link>
						</li>
						<li className='mb-2'>
							<Link to='/projects' className='block text-gray-700 hover:bg-gray-200 p-2 rounded'>
								Projects
							</Link>
						</li>
						<li className='mb-2'>
							<Link to='/researchers' className='block text-gray-700 hover:bg-gray-200 p-2 rounded'>
								Researchers
							</Link>
						</li>
						<li className='mb-2'>
							<Link to='/settings' className='block text-gray-700 hover:bg-gray-200 p-2 rounded'>
								Settings
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
