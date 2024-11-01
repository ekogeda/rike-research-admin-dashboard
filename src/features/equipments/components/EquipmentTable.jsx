import { useRef, useState, useEffect } from 'react';
import { getEquipmentById, deleteEquipment } from '../../../services/equipmentService';
import { useEquipmentContext } from '../../../context/EquipmentContext';
import PropTypes from 'prop-types';
import EquipmentCard from './EquipmentCard';
import EquipmentDetails from './EquipmentDetails';
import MessageSVG from '../../../assets/message.svg';
import AddSVG from '../../../assets/add.svg';
import DotsSVG from '../assets/horizontal-dots-icon.svg';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const EquipmentTable = ({ data, onDelete, onEdit }) => {
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
	const [showDropdown, setShowDropdown] = useState(null);
	const dropdownRef = useRef(null);
	const { updateEquipment } = useEquipmentContext();
	const [showModal, setShowModal] = useState(false);

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleAction = async (id, action) => {
		setShowDropdown(null);
		if (action === 'view') {
			try {
				const equipmentData = await getEquipmentById(id);
				updateEquipment(equipmentData);
				setShowModal(true);
			} catch (error) {
				console.error('Error fetching equipment:', error);
			}
		} else if (action === 'edit') {
			onEdit('edit');
			try {
				const equipmentData = await getEquipmentById(id);
				updateEquipment(equipmentData);
			} catch (error) {
				console.error('Error fetching equipment:', error);
			}
		} else if (action === 'delete') {
			try {
				await deleteEquipment(id);
				toast.success('Equipment deleted successfully');
				onDelete((prevData) => prevData.filter((item) => item.id !== id));
			} catch (error) {
				console.error('Error deleting equipment:', error);
			}
		}
	};

	const handleView = async (id) => {
		setShowDropdown(null);

		try {
			const equipment = await getEquipmentById(id);
			updateEquipment(equipment);
			setShowModal(true);
		} catch (error) {
			console.error('Error fetching equipment:', error);
		}
	};

	const toggleDropdown = (id) => {
		setShowDropdown((prev) => (prev === id ? null : id));
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);

	const sortedData = [...data].sort((a, b) => {
		if (sortConfig.key) {
			const aValue = a[sortConfig.key].toLowerCase();
			const bValue = b[sortConfig.key].toLowerCase();

			if (aValue < bValue) {
				return sortConfig.direction === 'ascending' ? -1 : 1;
			}
			if (aValue > bValue) {
				return sortConfig.direction === 'ascending' ? 1 : -1;
			}
		}
		return 0;
	});

	const handleSort = (key) => {
		let direction = 'ascending';
		if (sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};

	const truncateText = (text, maxLength) => {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + '...';
		}
		return text;
	};

	return (
		<>
			<table className='hidden lg:block min-w-full bg-white border rounded-md'>
				<thead>
					<tr className='bg-[#F8FAFC] text-left'>
						<th className='p-2 text-sm cursor-pointer' onClick={() => handleSort('name')}>
							Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
						</th>
						<th className='p-2 text-sm'>Description</th>
						<th className='p-2 text-sm'>Availability</th>
						<th className='p-2 text-sm cursor-pointer' onClick={() => handleSort('institutionName')}>
							Institution Name{' '}
							{sortConfig.key === 'institutionName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
						</th>
						<th className='p-2 text-sm'>Location</th>
						<th className='p-2 text-sm'>Action</th>
					</tr>
				</thead>
				<tbody>
					{sortedData.map((item, index) => (
						<tr key={index} className='border-t'>
							<td className='p-2 text-sm w-[268px]'>
								<p className='flex flex-wrap '>{item?.name}</p>
								<span className='text-[#207A7A]'>{item?.insight}</span>
							</td>
							<td className='p-2 text-sm'>{truncateText(item?.description, 50)}</td>
							<td className='p-2 text-sm'>{item?.availability ? 'Yes' : 'No'}</td>
							<td className='p-2 text-sm'>{item?.institutionName}</td>
							<td className='p-2 text-sm'>{item?.location}</td>
							<td className='p-2 text-sm relative'>
								{/* Button to toggle dropdown */}
								<button className='p-1' onClick={() => toggleDropdown(item.id)}>
									<img src={DotsSVG} alt='Dots' className='w-4' />
								</button>

								{/* Dropdown menu */}
								{showDropdown === item.id && (
									<div ref={dropdownRef} className='absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10'>
										<ul className='py-1'>
											<li
												className='px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
												onClick={() => handleAction(item.id, 'view')}
											>
												View
											</li>
											<li
												className='px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
												onClick={() => handleAction(item.id, 'edit')}
											>
												Edit
											</li>
											<li
												className='px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
												onClick={() => handleAction(item.id, 'delete')}
											>
												Delete
											</li>
										</ul>
									</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className='lg:hidden space-y-6'>
				{sortedData.map((item) => (
					<EquipmentCard
						key={item?.id}
						id={item?.id}
						title={item?.name}
						subtitle={item?.taxonomy}
						bodyContent={
							<div className='text-sm md:text-base space-y-1'>
								<p>{item?.description}</p>
								<p className='text-sm md:text-base'>
									<span className='text-gray-400'>Availability:</span> {item?.availability ? 'Yes' : 'No'}
								</p>
								<p className='text-sm md:text-base'>
									<span className='text-gray-400'>Institution Name:</span> {item?.institutionName}
								</p>
							</div>
						}
						footerContent={
							<button
								onClick={() => handleView(item?.id)}
								className='w-full border bg-white text-sm md:text-base hover:bg-slate-200 px-4 py-2 rounded-lg'
							>
								View Equipment
							</button>
						}
						onAction={handleAction}
					/>
				))}
			</div>

			<div className='hidden flex-col items-center text-center space-y-3 my-10'>
				<img src={MessageSVG} alt='Message' className='w-14' />
				<h3 className='text-2xl text-gray-500'>No Equipment Yet</h3>
				<p className='text-[#5F7691]'>We&apos;ll let you know when there will be something to update you.</p>
				<button className='flex items-center gap-1 bg-[#09704A] text-white px-4 py-2 rounded-full'>
					<img src={AddSVG} alt='Search' className='w-4' />
					Create Equipment
				</button>
			</div>

			{showModal && <EquipmentDetails onClose={handleCloseModal} />}
		</>
	);
};

EquipmentTable.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			taxonomy: PropTypes.string.isRequired,
		})
	),
	// setEquipments: PropTypes.func,
};

export default EquipmentTable;
