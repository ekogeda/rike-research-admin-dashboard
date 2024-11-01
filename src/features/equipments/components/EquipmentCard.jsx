import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import HorizontalOutlineSVG from '../../../assets/horizontal-outline.svg';
import StarSVG from '../../../assets/star.svg';

const EquipmentCard = ({ id, title, subtitle, bodyContent, footerContent, onAction }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setShowDropdown((prev) => !prev);
	};

	const handleActionClick = (action) => {
		onAction(id, action);
		setShowDropdown(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='bg-white border shadow-lg rounded-lg overflow-hidden'>
			<div className='flex items-center justify-end space-x-4 px-4 mt-4 relative'>
				<img src={HorizontalOutlineSVG} alt='Outline' className='w-6 h-6 cursor-pointer' onClick={toggleDropdown} />

				{showDropdown && (
					<div ref={dropdownRef} className='absolute right-0 top-8 bg-white border rounded shadow-lg w-32 z-10'>
						<ul className='py-1'>
							<li
								className='px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
								onClick={() => handleActionClick('edit')}
							>
								Edit
							</li>
							<li
								className='px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
								onClick={() => handleActionClick('delete')}
							>
								Delete
							</li>
						</ul>
					</div>
				)}

				<img src={StarSVG} alt='Star' className='hidden w-6 h-6' />
			</div>

			<div className='px-3 py-2 md:px-6 md:py-4 border-b'>
				<h2 className='text-lg md:text-xl font-semibold text-gray-800'>{title}</h2>
				<p className='text-sm md:text-base text-[#207A7A]'>{subtitle}</p>
			</div>

			<div className='px-3 md:px-6 py-4'>{bodyContent}</div>

			<div className='px-3 py-2 md:px-6 md:py-4 border-t bg-gray-50 text-right'>{footerContent}</div>
		</div>
	);
};

EquipmentCard.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	bodyContent: PropTypes.node.isRequired,
	footerContent: PropTypes.node,
	onAction: PropTypes.func.isRequired,
};

export default EquipmentCard;
