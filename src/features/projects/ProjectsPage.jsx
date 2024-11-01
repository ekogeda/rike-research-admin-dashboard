import React, { useState } from 'react';
import ProjectList from './components/ProjectList';

const ProjectsPage = () => {
	const [projects] = useState([
		{
			id: 1,
			title: 'AI Research Project',
			status: 'In Progress',
			description: 'Exploring AI advancements in healthcare.',
		},
		{
			id: 2,
			title: 'Climate Change Analysis',
			status: 'Completed',
			description: 'Study on climate impact over the last decade.',
		},
		{
			id: 3,
			title: 'Quantum Computing Study',
			status: 'In Progress',
			description: 'Investigating quantum algorithms for optimization.',
		},
		{
			id: 4,
			title: 'Sustainable Energy Solutions',
			status: 'Pending',
			description: 'Researching renewable energy technologies.',
		},
	]);

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Filter projects based on search query
	const filteredProjects = projects.filter(
		(project) =>
			project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-6'>Projects</h1>

			{/* Search Bar */}
			<div className='mb-6'>
				<input
					type='text'
					placeholder='Search projects by title or description...'
					value={searchQuery}
					onChange={handleSearchChange}
					className='w-full p-2 border border-gray-300 rounded-lg'
				/>
			</div>

			{/* Button to Add New Project */}
			<div className='mb-4'>
				<button className='bg-blue-600 text-white px-4 py-2 rounded-lg'>Add New Project</button>
			</div>

			{/* Project List */}
			<ProjectList projects={filteredProjects} />
		</div>
	);
};

export default ProjectsPage;
