import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllTaxonomy } from '../../../services/taxonomyService';
import SearchSVG from '../../../assets/search.svg';
import CategorySVG from '../../../assets/category.svg';
import PriceSVG from '../../../assets/price-range.svg';
import AvailabilitySVG from '../../../assets/availability.svg';
import AddSVG from '../../../assets/add.svg';
import ChevronLeftSVG from '../../../assets/chevron-left.svg';
import ChevronLeftDoubleSVG from '../../../assets/chevron-left-double.svg';
import ChevronRightSVG from '../../../assets/chevron-right.svg';
import ChevronRightDoubleSVG from '../../../assets/chevron-right-double.svg';
import CreateIconSVG from '../assets/create-icon.svg';

const EquipmentFilters = ({ onFilter, onCreate, currentPage, totalItems, itemsPerPage, onPageChange }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [taxonomy, setTaxonomy] = useState('');
	const [priceRange, setPriceRange] = useState('');
	const [availability, setAvailability] = useState('');
	const [taxonomies, setTaxonomies] = useState([]);

	useEffect(() => {
		const fetchTaxonomies = async () => {
			try {
				const data = await getAllTaxonomy();
				setTaxonomies(data);
			} catch (error) {
				console.error('Failed to fetch taxonomies', error);
			}
		};
		fetchTaxonomies();
	}, []);

	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handleFilterChange = (newFilters) => {
		onFilter({
			searchTerm: newFilters?.searchTerm || searchTerm,
			taxonomy: newFilters?.taxonomy || taxonomy,
			priceRange: newFilters?.priceRange || priceRange,
			availability: newFilters?.availability || availability,
		});
	};

	const handleCreateEquipment = () => {
		if (onCreate) {
			onCreate('new');
		}
	};

	return (
		<div className='mb-6'>
			<div className='flex flex-col lg:flex-row justify-between gap-4'>
				<div className='w-full lg:w-[340px] flex gap-2 relative'>
					<input
						type='search'
						placeholder='Search by name or description'
						className='w-full border rounded-md py-2 pl-8'
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							handleFilterChange({ searchTerm: e.target.value });
						}}
					/>

					<img src={SearchSVG} alt='Search' className='absolute left-[10px] top-[14px] w-4' />

					<button onClick={handleCreateEquipment} className='flex xl:hidden items-center w-10 p-2 border rounded-md'>
						<img src={CreateIconSVG} alt='Create' />
					</button>
				</div>

				<div className='w-auto xl:w-1/3 flex md:flex items-center justify-center gap-4'>
					<p className='text-[#64748B]'>
						Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -
						{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
					</p>
					<div className='flex items-center border border-[#CBD5E1] rounded-lg'>
						<button
							type='button'
							disabled={currentPage === 1}
							onClick={() => onPageChange(currentPage - 1)}
							className='w-8 h-8 border-r border-[#CBD5E1] p-2'
						>
							<img src={ChevronLeftSVG} alt='Left' className='w-4 text-[#CBD5E1]' />
						</button>
						<button
							type='button'
							disabled={currentPage === 1}
							onClick={() => onPageChange(1)}
							className='w-8 h-8 border-r border-[#CBD5E1] p-2'
						>
							<img src={ChevronLeftDoubleSVG} alt='Left-d' className='w-4 text-[#CBD5E1]' />
						</button>
						<button
							type='button'
							disabled={currentPage === totalPages}
							onClick={() => onPageChange(currentPage + 1)}
							className='w-8 h-8 border-r border-[#CBD5E1] p-2'
						>
							<img src={ChevronRightSVG} alt='Right' className='w-4 text-[#CBD5E1]' />
						</button>
						<button
							type='button'
							disabled={currentPage === totalPages}
							onClick={() => onPageChange(totalPages)}
							className='w-8 h-8 border-[#CBD5E1] p-2'
						>
							<img src={ChevronRightDoubleSVG} alt='right-d' className='w-4 text-[#CBD5E1]' />
						</button>
					</div>
				</div>

				<div className='hidden xl:flex items-center space-x-4'>
					<div className='w-40 border rounded-full px-4 py-2 relative'>
						<select
							className='w-full pl-4 focus:outline-none focus:ring-0'
							value={taxonomy}
							onChange={(e) => {
								setTaxonomy(e.target.value);
								handleFilterChange({ taxonomy: e.target.value });
							}}
						>
							<option value=''>Taxonomy</option>
							{taxonomies.map((tax) => (
								<option key={tax.id} value={tax.value}>
									{tax.value}
								</option>
							))}
						</select>

						<img src={CategorySVG} alt='Search' className='absolute left-[10px] top-[12px] w-4' />
					</div>

					<div className='hidden w-40 border rounded-full px-4 py-2 relative'>
						<select
							className='w-full pl-4 focus:outline-none focus:ring-0'
							value={priceRange}
							onChange={(e) => {
								setPriceRange(e.target.value);
								handleFilterChange({ priceRange: e.target.value });
							}}
						>
							<option value=''>Price Ranges</option>
							<option value='0-1000'>$0 - $1000</option>
							<option value='1000-5000'>$1000 - $5000</option>
							<option value='5000-10000'>$5000 - $10000</option>
						</select>

						<img src={PriceSVG} alt='Search' className='absolute left-[10px] top-[10px] w-4' />
					</div>

					<div className='w-40 border rounded-full px-4 py-2 relative'>
						<select
							className='w-full pl-4 focus:outline-none focus:ring-0'
							value={availability}
							onChange={(e) => {
								setAvailability(e.target.value);
								handleFilterChange({ availability: e.target.value });
							}}
						>
							<option value=''>Availability</option>
							<option value='Yes'>Available</option>
							<option value='No'>Out of Stock</option>
						</select>

						<img src={AvailabilitySVG} alt='Search' className='absolute left-[10px] top-[14px] w-4' />
					</div>

					<button
						onClick={handleCreateEquipment}
						className='flex items-center gap-1 bg-[#09704A] text-white px-4 py-2 rounded-full'
					>
						<img src={AddSVG} alt='Search' className='w-4' />
						Create <span className='hidden md:inline-block'>Equipment</span>
					</button>
				</div>
			</div>
		</div>
	);
};

EquipmentFilters.propTypes = {
	onFilter: PropTypes.func.isRequired,
	onCreate: PropTypes.func,
	currentPage: PropTypes.number.isRequired,
	totalItems: PropTypes.number.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default EquipmentFilters;
