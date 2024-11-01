const DashboardStats = () => {
	return (
		<div className='bg-white shadow-md p-6 rounded-lg'>
			<h3 className='text-xl font-bold mb-4'>Research Overview</h3>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<div>
					<p className='text-sm text-gray-600'>Ongoing Research</p>
					<p className='text-2xl font-bold'>15</p>
				</div>
				<div>
					<p className='text-sm text-gray-600'>Published Papers</p>
					<p className='text-2xl font-bold'>32</p>
				</div>
				<div>
					<p className='text-sm text-gray-600'>New Researchers</p>
					<p className='text-2xl font-bold'>8</p>
				</div>
			</div>
		</div>
	);
};

export default DashboardStats;
