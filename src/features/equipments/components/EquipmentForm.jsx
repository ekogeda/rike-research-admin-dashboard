import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { createEquipment, updateEquipment } from '../../../services/equipmentService';
import { getAllTaxonomy } from '../../../services/taxonomyService';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import PlaceholderSVG from '../assets/placeholder-icon.svg';
import AddSVG from '../../../assets/add.svg';
import LoadingOverlay from '../../../components/LoadingOverlay';

const EquipmentForm = ({ equipment, formAction, onSuccess }) => {
	const [loading, setLoading] = useState(true);
	const { user } = useContext(AuthContext);
	const userData = user?.user;

	const [formData, setFormData] = useState({
		name: '',
		description: '',
		taxonomy: '',
		availability: false,
		verificationStatus: false,
		image: '',
		verifiedBy: 0,
		institutionName: '',
		location: '',
		contactEmail: '',
	});

	const [taxonomies, setTaxonomies] = useState([]);

	useEffect(() => {
		if (equipment && formAction === 'edit') {
			setLoading(false);

			setFormData({
				name: equipment.name || '',
				description: equipment.description || '',
				taxonomy: equipment.taxonomy || '',
				availability: equipment.availability || false,
				verificationStatus: equipment.verificationStatus || false,
				image: equipment.image || '',
				verifiedBy: equipment.verifiedBy || 0,
				institutionName: equipment.institutionName || '',
				location: equipment.location || '',
				contactEmail: equipment.contactEmail || '',
			});
		}
	}, [equipment]);

	useEffect(() => {
		const fetchTaxonomies = async () => {
			try {
				const data = await getAllTaxonomy();
				setLoading(false);
				setTaxonomies(data);
			} catch (error) {
				console.error('Failed to fetch taxonomies', error);
			}
		};

		fetchTaxonomies();
	}, []);

	const onDrop = (acceptedFiles) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setFormData((prevData) => ({
				...prevData,
				image: reader.result,
			}));
		};
		reader.readAsDataURL(acceptedFiles[0]);
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/*',
		multiple: false,
	});

	const handleInputChange = (e) => {
		const { id, value, type, checked } = e.target;
		setFormData({
			...formData,
			[id]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const submissionData = {
			name: formData.name,
			description: formData.description,
			taxonomy: formData.taxonomy,
			availability: formData.availability,
			verificationStatus: formData.verificationStatus,
			verifiedBy: userData?.id,
			institutionName: formData.institutionName,
			location: formData.location,
			contactEmail: formData.contactEmail,
			image: formData.image,
		};

		try {
			setLoading(true);

			if (equipment && formAction === 'edit') {
				const response = await updateEquipment(equipment.id, submissionData);
				toast.success('Equipment updated successfully');
				onSuccess();
			} else {
				const response = await createEquipment(submissionData);
				toast.success('Equipment created successfully');
				onSuccess();
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{loading && <LoadingOverlay />}

			<form className='space-y-6 bg-white rounded-lg' onSubmit={handleSubmit}>
				<div className='flex flex-col'>
					<label htmlFor='name' className='text-sm font-medium text-gray-700'>
						Equipment Name
					</label>
					<input
						type='text'
						id='name'
						placeholder='Enter equipment name'
						className='mt-1 p-4 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
						value={formData.name}
						onChange={handleInputChange}
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='description' className='text-sm font-medium text-gray-700'>
						Description
					</label>
					<textarea
						id='description'
						placeholder='Enter equipment description'
						rows='4'
						className='mt-1 p-4 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
						value={formData.description}
						onChange={handleInputChange}
					/>
				</div>
				<div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
					<div className='w-full lg:w-1/2 flex flex-col'>
						<label htmlFor='taxonomy' className='text-sm font-medium text-gray-700'>
							Taxonomy
						</label>
						<select
							id='taxonomy'
							className='mt-1 p-4 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
							value={formData.taxonomy}
							onChange={handleInputChange}
						>
							<option value=''>Select Taxonomy</option>
							{taxonomies.map((tax) => (
								<option key={tax.id} value={tax.value}>
									{tax.value}
								</option>
							))}
						</select>
					</div>
					<div className='flex items-center'>
						<label htmlFor='availability' className='text-sm font-medium text-gray-700'>
							Available
						</label>
						<input
							type='checkbox'
							id='availability'
							className='ml-2'
							checked={formData.availability}
							onChange={handleInputChange}
						/>
					</div>
					<div className='flex items-center'>
						<label htmlFor='verificationStatus' className='text-sm font-medium text-gray-700'>
							Verification Status
						</label>
						<input
							type='checkbox'
							id='verificationStatus'
							className='ml-2'
							checked={formData.verificationStatus}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
					<div className='w-full flex flex-col'>
						<label htmlFor='institutionName' className='text-sm font-medium text-gray-700'>
							Institution Name
						</label>
						<input
							type='text'
							id='institutionName'
							placeholder='Enter institution name'
							className='mt-1 p-4 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
							value={formData.institutionName}
							onChange={handleInputChange}
						/>
					</div>
					<div className='w-full flex flex-col'>
						<label htmlFor='location' className='text-sm font-medium text-gray-700'>
							Location
						</label>
						<input
							type='text'
							id='location'
							placeholder='Enter location'
							className='mt-1 p-4 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
							value={formData.location}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='contactEmail' className='text-sm font-medium text-gray-700'>
						Contact Email
					</label>
					<input
						type='email'
						id='contactEmail'
						placeholder='Enter contact email'
						className='mt-1 p-4 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
						value={formData.contactEmail}
						onChange={handleInputChange}
					/>
				</div>
				<div className='flex lg:items-center gap-6'>
					<div className='flex flex-col w-full lg:w-1/2'>
						<label className='text-sm font-medium text-gray-700'>Upload Images</label>
						<div
							{...getRootProps()}
							className='mt-1 p-6 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09704A]'
						>
							<input {...getInputProps()} />
							<div className='h-full space-y-4'>
								<img src={PlaceholderSVG} alt='Profile' className='w-8 mx-auto' />
								<div className='text-sm md:text-base text-center'>
									<p className='font-semibold'>
										<span className='text-[#0EA5E9]'>Click to upload</span> or drag and drop
									</p>
									<p className='text-gray-400'>JPG, JPEG, PNG less than 1MB</p>
								</div>
							</div>
						</div>
					</div>
					<div>
						{formData.image && (
							<div className='text-sm text-gray-600'>
								<img
									src={formData.image}
									alt='Uploaded preview'
									className='mt-7 w-36 h-w-36 object-cover border rounded'
								/>
							</div>
						)}
					</div>
				</div>
				<div>
					<button
						type='submit'
						className='flex items-center gap-1 text-white bg-[#09704A] hover:bg-[#06593C] transition-colors px-4 py-2 rounded-full'
					>
						<img src={AddSVG} alt='Add' className='w-4' />
						<span>{formAction === 'edit' ? 'Update Equipment' : 'Create Equipment'}</span>
					</button>
				</div>
			</form>
		</>
	);
};

export default EquipmentForm;
