import { useEquipmentContext } from '../../../context/EquipmentContext';

const EquipmentDetails = ({ onClose }) => {
	const { equipment } = useEquipmentContext();

	if (!equipment) {
		return <div>Loading equipment details...</div>;
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
			<div className='bg-white rounded-lg p-6 max-w-3xl w-full h-full max-h-[90vh] overflow-auto lg:h-auto'>
				<h2 className='text-lg md:text-xl font-bold mb-4'>Equipment Details</h2>

				<div className='space-y-6'>
					<div className='flex flex-col md:flex-row md:gap-8 space-y-4 md:space-y-0'>
						<div className='w-full'>
							<h3 className='font-semibold text-base md:text-lg'>Name</h3>
							<p>{equipment.name}</p>
						</div>
						<div className='w-full'>
							<h3 className='font-semibold text-base md:text-lg'>Description</h3>
							<p>{equipment.description}</p>
						</div>
					</div>

					<div className='flex flex-col md:flex-row md:gap-8 space-y-4 md:space-y-0'>
						<div className='w-full'>
							<h3 className='font-semibold text-lg'>Taxonomy</h3>
							<p>{equipment.taxonomy}</p>
						</div>
						<div className='w-full'>
							<h3 className='font-semibold text-lg'>Availability</h3>
							<p>{equipment.availability ? 'Available' : 'Not Available'}</p>
						</div>
					</div>

					<div className='flex flex-col md:flex-row md:gap-8 space-y-4 md:space-y-0'>
						<div className='w-full'>
							<h3 className='font-semibold text-lg'>Location</h3>
							<p>{equipment.location}</p>
						</div>
						<div className='w-full'>
							<h3 className='font-semibold text-lg'>Institution Name</h3>
							<p>{equipment.institutionName}</p>
						</div>
					</div>

					<div className='flex flex-col md:flex-row md:gap-8 space-y-4 md:space-y-0'>
						<div className='w-full'>
							<h3 className='font-semibold text-base md:text-lg'>Contact Email</h3>
							<p>{equipment.contactEmail}</p>
						</div>

						{equipment.image && (
							<div className='w-full'>
								<h3 className='font-semibold text-base md:text-lg'>Image</h3>
								<img
									src={equipment.image}
									alt='Equipment'
									className='w-full max-w-sm h-auto object-contain border rounded-lg'
								/>
							</div>
						)}
					</div>
				</div>

				<div className='mt-6 text-right'>
					<button onClick={onClose} className='px-6 py-2 bg-[#09704A] text-white rounded-lg hover:bg-[#06593C]'>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default EquipmentDetails;
