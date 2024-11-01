import { useState } from 'react';
import ResearcherList from './components/ResearcherList';

const ResearchersPage = () => {
	// Example data for researchers
	const [researchers] = useState([
		{ id: 1, name: 'Alice Johnson', department: 'Biotechnology', role: 'Senior Researcher' },
		{ id: 2, name: 'David Miller', department: 'Physics', role: 'Junior Researcher' },
		{ id: 3, name: 'Emily Clark', department: 'Chemistry', role: 'Senior Researcher' },
		{ id: 4, name: 'Michael Scott', department: 'Computer Science', role: 'Research Assistant' },
		// Add more researchers as needed
	]);

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Filter researchers based on search query
	const filteredResearchers = researchers.filter(
		(researcher) =>
			researcher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			researcher.department.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-6'>Researchers</h1>

			{/* Search Bar */}
			<div className='mb-6'>
				<input
					type='text'
					placeholder='Search researchers by name or department...'
					value={searchQuery}
					onChange={handleSearchChange}
					className='w-full p-2 border border-gray-300 rounded-lg'
				/>
			</div>

			{/* Researcher List */}
			<ResearcherList researchers={filteredResearchers} />

			{/* Pagination (if needed in future) */}
			{/* <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Previous</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Next</button>
      </div> */}
		</div>
	);
};

export default ResearchersPage;
