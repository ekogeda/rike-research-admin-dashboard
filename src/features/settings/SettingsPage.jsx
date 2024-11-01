import React from 'react';
import AccountSettings from './components/AccountSettings';
import NotificationSettings from './components/NotificationSettings';

const SettingsPage = () => {
	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-6'>Settings</h1>

			{/* Account Settings Section */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Account Settings</h2>
				<AccountSettings />
			</div>

			{/* Notification Settings Section */}
			<div>
				<h2 className='text-xl font-semibold mb-4'>Notification Settings</h2>
				<NotificationSettings />
			</div>
		</div>
	);
};

export default SettingsPage;
