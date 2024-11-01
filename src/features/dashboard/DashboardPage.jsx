import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import DashboardCard from './components/DashboardCard';
import './dashboard.css';

const dummyData = [
	{
		value: '42',
		title: 'Available Equipment',
		description: '3 new items added this month',
	},
	{
		value: '18',
		title: 'Active Collaborations',
		description: '2 new collaborations this quarter',
	},
	{
		value: '7',
		title: 'Ongoing Research Projects',
		description: '1 project completed this month',
	},
	{
		value: '5',
		title: 'Pending Equipment Requests',
		description: '3 new requests this week',
	},
	{
		value: '12',
		title: 'Partnership Opportunities',
		description: '4 new opportunities this month',
	},
	{
		value: '42',
		title: 'Unread Notifications',
		description: '3 new notifications today',
	},
];

const DashboardPage = () => {
	const { user } = useContext(AuthContext);
	const userData = user?.user;
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) navigate('/');
	}, [user, navigate]);

	return (
		<div className='w-full xl:w-[1197px] mx-auto p-4 py-4 md:py-6 lg:py-8 space-y-6'>
			<div className=''>
				<h1 className='text-2xl font-bold'>Dashboard</h1>
				<p className='text-sm'>
					{userData?.firstName} {userData?.lastName} hello @{userData?.email}·{' '}
					<span className='font-semibold hover:cursor-pointer hover:underline '>Edit profile</span>
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{dummyData.map((data, index) => (
					<DashboardCard key={index} value={data.value} title={data.title} description={data.description} />
				))}
				{/* <DashboardStats /> */}
			</div>
		</div>
	);
};

export default DashboardPage;
