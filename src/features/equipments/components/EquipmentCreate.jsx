// import { Link } from 'react-router-dom';
import EquipmentForm from './EquipmentForm';
import BackSVG from '../assets/back-icon.svg';
import { useEquipmentContext } from '../../../context/EquipmentContext';

function EquipmentCreate({ setActiveTab, formAction }) {
	const { equipment, updateEquipment } = useEquipmentContext();

	const handBackToEquipmentPage = () => {
		updateEquipment(null);
		setActiveTab('Equipments');
	};

	return (
		<div className='relative'>
			<button
				onClick={() => handBackToEquipmentPage()}
				className='absolute -top-6 flex items-center font-semibold gap-2'
			>
				<img src={BackSVG} alt='Search' className='w-4' /> Back
			</button>

			<h1 className='text-2xl md:text-4xl font-bold mb-2'>
				<span>{formAction === 'edit' ? 'Edit Equipment' : 'Create Equipment'}</span>
			</h1>
			<p className='text-gray-600 mb-6'>
				Discover cutting-edge research and innovations from peers in your field. Share feedback, connect, or collaborate
				to shape the future of technology and science.
			</p>

			<div className='w-full p-4 md:p-8 border shadow-lg rounded-lg space-y-6'>
				<h3 className='text-2xl font-semibold'>Equipment Information</h3>

				<div>
					<EquipmentForm equipment={equipment} formAction={formAction} onSuccess={() => handBackToEquipmentPage()} />
				</div>
			</div>
		</div>
	);
}

export default EquipmentCreate;
