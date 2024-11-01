import ProjectItem from './ProjectItem';

const ProjectList = ({ projects }) => {
	if (projects.length === 0) {
		return <p className='text-gray-600'>No projects found.</p>;
	}

	return (
		<div className='bg-white shadow-md rounded-lg'>
			<div className='divide-y'>
				{projects.map((project) => (
					<ProjectItem key={project.id} project={project} />
				))}
			</div>
		</div>
	);
};

export default ProjectList;
