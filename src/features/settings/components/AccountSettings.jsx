import { useState } from 'react';

const AccountSettings = () => {
	const [formData, setFormData] = useState({
		name: 'John Doe',
		email: 'john.doe@example.com',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission
		console.log('Form submitted:', formData);
	};

	return (
		<form className='bg-white shadow-md p-6 rounded-lg' onSubmit={handleSubmit}>
			<div className='mb-4'>
				<label className='block mb-2'>Name</label>
				<input
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
					className='w-full p-2 border border-gray-300 rounded-lg'
				/>
			</div>
			<div className='mb-4'>
				<label className='block mb-2'>Email</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					className='w-full p-2 border border-gray-300 rounded-lg'
				/>
			</div>
			<button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-lg'>
				Save Changes
			</button>
		</form>
	);
};

export default AccountSettings;
