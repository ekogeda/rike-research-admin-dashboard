import ResearcherItem from './ResearcherItem';

const ResearcherList = ({ researchers }) => {
	return (
		<div className='bg-white shadow-md rounded-lg'>
			<h3 className='text-xl font-bold p-4'>Researchers</h3>
			<div className='divide-y'>
				{researchers.map((researcher) => (
					<ResearcherItem key={researcher.id} researcher={researcher} />
				))}
			</div>
		</div>
	);
};

export default ResearcherList;
