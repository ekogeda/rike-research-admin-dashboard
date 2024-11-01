import ProfileSVG from '../assets/profile-icon.svg';
import EquipmentSVG from '../assets/equipment-icon.svg';
import ProjectSVG from '../assets/project-icon.svg';
import TaskSVG from '../assets/task-icon.svg';
import ReportSVG from '../assets/report-icon.svg';
import UserSVG from '../assets/user-icon.svg';
import PropTypes from 'prop-types';

const EquipmentSidebar = ({ activeTab, setActiveTab }) => {
	const getActiveStyles = (tab) =>
		tab === activeTab
			? 'text-[#075438] hover:text-[#043221] bg-[#E6F1ED] hover:bg-[#B3D3C7]'
			: 'text-[#075438] hover:text-[#05432C] hover:bg-[#DAEAE4]';

	return (
		<div className='hidden md:block w-52 lg:w-80 px-6 py-8 border-r'>
			<ul className='space-y-1'>
				<li
					className={`mb-2 text-sm px-4 py-3 rounded-lg hover:cursor-pointer ${getActiveStyles('Profile')}`}
					onClick={() => setActiveTab('Profile')}
				>
					<a href='#' className='flex items-center space-x-2'>
						<img src={ProfileSVG} alt='Profile' className='w-5' />
						<span>Profile</span>
					</a>
				</li>
				<li
					className={`mb-2 text-sm px-4 py-3 rounded-lg hover:cursor-pointer ${getActiveStyles('Equipments')}`}
					onClick={() => setActiveTab('Equipments')}
				>
					<a href='#' className='flex items-center space-x-2'>
						<img src={EquipmentSVG} alt='Equip' className='w-5' />
						<span>Equipments</span>
					</a>
				</li>
				<li
					className={`mb-2 text-sm px-4 py-3 rounded-lg hover:cursor-pointer ${getActiveStyles('Projects')}`}
					onClick={() => setActiveTab('Projects')}
				>
					<a href='#' className='flex items-center space-x-2'>
						<img src={ProjectSVG} alt='Project' className='w-5' />
						<span>Projects</span>
					</a>
				</li>
				<li
					className={`mb-2 text-sm px-4 py-3 rounded-lg hover:cursor-pointer ${getActiveStyles('Tasks')}`}
					onClick={() => setActiveTab('Tasks')}
				>
					<a href='#' className='flex items-center space-x-2'>
						<img src={TaskSVG} alt='Task' className='w-5' />
						<span>Tasks</span>
					</a>
				</li>
				<li
					className={`mb-2 text-sm px-4 py-3 rounded-lg hover:cursor-pointer ${getActiveStyles('Reporting')}`}
					onClick={() => setActiveTab('Reporting')}
				>
					<a href='#' className='flex items-center space-x-2'>
						<img src={ReportSVG} alt='Report' className='w-5' />
						<span>Reporting</span>
					</a>
				</li>
				<li
					className={`mb-2 text-sm px-4 py-3 rounded-lg hover:cursor-pointer ${getActiveStyles('Users')}`}
					onClick={() => setActiveTab('Users')}
				>
					<a href='#' className='flex items-center space-x-2'>
						<img src={UserSVG} alt='User' className='w-5' />
						<span>Users</span>
					</a>
				</li>
			</ul>
		</div>
	);
};

EquipmentSidebar.propTypes = {
	activeTab: PropTypes.string.isRequired,
	setActiveTab: PropTypes.func.isRequired,
};

export default EquipmentSidebar;
