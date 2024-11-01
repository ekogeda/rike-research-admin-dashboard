import PropTypes from 'prop-types';

const DashboardCard = ({ value, title, description }) => {
	return (
		<div className='w-full xl:w-[275px] h-[155px] px-[16px] py-[31px] bg-white shadow-md rounded-lg flex items-center space-x-2'>
			<div className='space-y-2'>
				<p className='text-2xl font-bold'>{value}</p>
				<h3 className='text-base text-[#222222] font-semibold'>{title}</h3>
				{description && <p className='text-sm text-[#717171]'>{description}</p>}
			</div>
		</div>
	);
};

DashboardCard.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.string,
	description: PropTypes.string,
};

export default DashboardCard;
