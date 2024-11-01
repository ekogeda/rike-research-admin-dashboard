import { useState } from 'react';
import PropTypes from 'prop-types';
import EquipmentFilters from './EquipmentFilters';
import EquipmentTable from './EquipmentTable';

const EquipmentSection = ({ initialData, onCreate }) => {
	const [filteredData, setFilteredData] = useState(initialData);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const totalItems = filteredData.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const handlePageChange = (newPage) => {
		if (newPage > 0 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	const handleFilter = (filters) => {
		const { searchTerm, taxonomy, availability } = filters;

		const filtered = initialData.filter((item) => {
			const isAvailable = item.availability ? 'Yes' : 'No';

			const matchesSearch = searchTerm
				? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				  item.description.toLowerCase().includes(searchTerm.toLowerCase())
				: true;

			const matchesCategory = taxonomy ? item.taxonomy === taxonomy : true;
			const matchesAvailability = availability ? isAvailable === availability : true;

			return matchesSearch && matchesCategory && matchesAvailability;
		});

		setFilteredData(filtered);
	};

	return (
		<div>
			<h1 className='text-2xl md:text-4xl font-bold mb-2'>My Equipment</h1>
			<p className='text-gray-600 mb-6'>
				Discover cutting-edge research and innovations from peers in your field. Share feedback, connect, or collaborate
				to shape the future of technology and science.
			</p>

			<div className='rounded-lg md:shadow-lg md:border p-0 md:p-8'>
				<EquipmentFilters
					onFilter={handleFilter}
					onCreate={onCreate}
					currentPage={currentPage}
					totalItems={filteredData.length}
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageChange}
				/>
				<EquipmentTable data={paginatedData} onDelete={setFilteredData} onEdit={onCreate} />
			</div>
		</div>
	);
};

EquipmentSection.propTypes = {
	initialData: PropTypes.array.isRequired,
	onCreate: PropTypes.func.isRequired,
};

export default EquipmentSection;
