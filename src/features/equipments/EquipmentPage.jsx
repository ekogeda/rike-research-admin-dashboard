import { useEffect, useState } from 'react';
import { getAllEquipment } from '../../services/equipmentService';
import LoadingOverlay from '../../components/LoadingOverlay';
import EquipmentSidebar from './components/EquipmentSidebar';
import EquipmentSection from './components/EquipmentSection';
import EquipmentCreate from './components/EquipmentCreate';
import { toast } from 'react-toastify';

const EquipmentPage = () => {
	const [activeTab, setActiveTab] = useState('Equipments');
	const [formAction, setFormAction] = useState('Equipments');
	const [equipmentList, setEquipmentList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchEquipment = async () => {
			try {
				const data = await getAllEquipment();
				setEquipmentList(data);
			} catch (err) {
				setError(err);
				toast.error('Failed to fetch equipment data.');
			} finally {
				setLoading(false);
			}
		};

		fetchEquipment();
	}, []); // Empty dependency array means this runs once when the component mounts

	if (loading) {
		return <LoadingOverlay />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const handleCreate = (params) => {
		setActiveTab('Create');
		setFormAction(params);
	};

	const renderContent = () => {
		switch (activeTab) {
			case 'Profile':
				return <div>Profile content goes here...</div>;
			case 'Projects':
				return <div>Projects content goes here...</div>;
			case 'Tasks':
				return <div>Tasks content goes here...</div>;
			case 'Reporting':
				return <div>Reporting content goes here...</div>;
			case 'Users':
				return <div>Users content goes here...</div>;
			case 'Create':
				return <EquipmentCreate setActiveTab={setActiveTab} formAction={formAction} />;
			case 'Equipments':
			default:
				return <EquipmentSection initialData={equipmentList} onCreate={handleCreate} />;
		}
	};

	return (
		<div className='flex h-full space-y-4'>
			<EquipmentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className='w-full lg:w-[1012px] flex-1 px-3 md:px-6 pt-6 pb-12'>{renderContent()}</div>
		</div>
	);
};

export default EquipmentPage;
