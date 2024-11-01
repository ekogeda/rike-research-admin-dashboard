import { useState } from 'react';

const NotificationSettings = () => {
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [pushNotifications, setPushNotifications] = useState(false);

	const handleToggle = (setter) => {
		setter((prev) => !prev);
	};

	return (
		<div className='bg-white shadow-md p-6 rounded-lg'>
			<div className='mb-4 flex justify-between items-center'>
				<span>Email Notifications</span>
				<button
					onClick={() => handleToggle(setEmailNotifications)}
					className={`w-10 h-6 rounded-full ${emailNotifications ? 'bg-blue-600' : 'bg-gray-400'}`}
				>
					<div className={`w-4 h-4 bg-white rounded-full transform ${emailNotifications ? 'translate-x-4' : ''}`}></div>
				</button>
			</div>
			<div className='flex justify-between items-center'>
				<span>Push Notifications</span>
				<button
					onClick={() => handleToggle(setPushNotifications)}
					className={`w-10 h-6 rounded-full ${pushNotifications ? 'bg-blue-600' : 'bg-gray-400'}`}
				>
					<div className={`w-4 h-4 bg-white rounded-full transform ${pushNotifications ? 'translate-x-4' : ''}`}></div>
				</button>
			</div>
		</div>
	);
};

export default NotificationSettings;
