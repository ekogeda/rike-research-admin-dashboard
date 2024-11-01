const ProjectItem = ({ project }) => {
	return (
		<div className='p-4 flex justify-between items-center hover:bg-gray-100'>
			<div>
				<h4 className='font-bold'>{project.title}</h4>
				<p className='text-sm text-gray-600'>{project.description}</p>
			</div>
			<span
				className={`text-sm ${
					project.status === 'In Progress'
						? 'text-yellow-500'
						: project.status === 'Completed'
						? 'text-green-500'
						: 'text-gray-500'
				}`}
			>
				{project.status}
			</span>
		</div>
	);
};

export default ProjectItem;
