const ResearcherItem = ({ researcher }) => {
	return (
		<div className='p-4 flex justify-between items-center hover:bg-gray-100'>
			<div>
				<h4 className='font-bold'>{researcher.name}</h4>
				<p className='text-sm text-gray-600'>{researcher.department}</p>
			</div>
		</div>
	);
};

export default ResearcherItem;
