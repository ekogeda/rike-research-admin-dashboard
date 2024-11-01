import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaEye, FaEyeSlash } from 'react-icons/fa';
import PopSVG from '../assets/pop-icon.svg';
import CloseSVG from '../assets/close-icon.svg';
import { registerUser } from '../../../services/authService';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const [formData, setFormData] = useState({
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: '',
		createdBy: 'applicant',
	});

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}

		// Clone form data and remove confirmPassword before submitting
		const dataToSubmit = { ...formData };
		delete dataToSubmit.confirmPassword;

		setLoading(true);

		try {
			const response = await registerUser(dataToSubmit);

			toast.success(response.message);

			setFormData({
				firstName: '',
				middleName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
				role: '',
				createdBy: '',
			});

			navigate('/');
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex justify-center items-center py-10'>
			<div className='bg-white md:p-6 w-full max-w-md space-y-8'>
				<div className='text-center md:text-left'>
					<h2 className='text-xl md:text-2xl font-bold mb-1 text-gray-800'>Join Research Connect Today!</h2>
					<p className='text-sm md:text-base text-[#8F95B2]'>
						Connecting researchers, reviewers, and collaborators to bring innovations to market.
					</p>
				</div>

				<div className='flex items-start justify-between bg-[#E6F1ED] p-4 rounded-md space-x-2'>
					<img src={PopSVG} alt='Pop' className='w-4 mt-1' />
					<p className='text-xs md:text-sm text-[#231F20]'>
						Showcase your research, connect with peers, and get feedback to advance your work.
					</p>
					<img src={CloseSVG} alt='Close' className='w-4 cursor-pointer' />
				</div>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='relative'>
						<label htmlFor='role' className='text-sm font-medium text-gray-700'>
							Register as
						</label>
						<div className='relative mt-1'>
							<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400'>
								<FaUserTag />
							</span>
							<select
								id='role'
								className='w-full pl-10 p-3 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
								value={formData.role}
								onChange={handleInputChange}
							>
								<option value=''>Select Role</option>
								<option value='applicant'>Applicant</option>
								<option value='innovator'>Innovator</option>
								<option value='researchInstitution'>Research Institution</option>
							</select>
						</div>
					</div>

					{/* First Name */}
					<div className='relative'>
						<label htmlFor='firstName' className='text-sm font-medium text-gray-700'>
							First Name
						</label>
						<div className='relative mt-1'>
							<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400'>
								<FaUser />
							</span>
							<input
								type='text'
								id='firstName'
								placeholder='Enter first name'
								className='w-full pl-10 p-3 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
								value={formData.firstName}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					{/* Middle Name */}
					<div className='relative'>
						<label htmlFor='middleName' className='text-sm font-medium text-gray-700'>
							Middle Name
						</label>
						<div className='relative mt-1'>
							<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400'>
								<FaUser />
							</span>
							<input
								type='text'
								id='middleName'
								placeholder='Enter middle name'
								className='w-full pl-10 p-3 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
								value={formData.middleName}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					{/* Last Name */}
					<div className='relative'>
						<label htmlFor='lastName' className='text-sm font-medium text-gray-700'>
							Last Name
						</label>
						<div className='relative mt-1'>
							<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400'>
								<FaUser />
							</span>
							<input
								type='text'
								id='lastName'
								placeholder='Enter last name'
								className='w-full pl-10 p-3 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
								value={formData.lastName}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className='relative'>
						<label htmlFor='email' className='text-sm font-medium text-gray-700'>
							Email Address
						</label>
						<div className='relative mt-1'>
							<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400'>
								<FaEnvelope />
							</span>
							<input
								type='email'
								id='email'
								placeholder='Enter email address'
								className='w-full pl-10 p-3 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className='relative'>
						<label htmlFor='password' className='text-sm font-medium text-gray-700'>
							Password
						</label>
						<div className='relative mt-1'>
							<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400'>
								<FaLock />
							</span>
							<input
								type={showPassword ? 'text' : 'password'}
								id='password'
								placeholder='Enter your password'
								className='w-full pl-10 p-3 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
								value={formData.password}
								onChange={handleInputChange}
							/>
							<span
								onClick={togglePasswordVisibility}
								className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400'
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>
					</div>

					<div className='relative'>
						<label htmlFor='confirmPassword' className='text-sm font-medium text-gray-700'>
							Confirm Password
						</label>
						<div className='relative mt-1'>
							<span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400'>
								<FaLock />
							</span>
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								id='confirmPassword'
								placeholder='Confirm your password'
								className='w-full pl-10 p-3 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
								value={formData.confirmPassword}
								onChange={handleInputChange}
							/>
							<span
								onClick={toggleConfirmPasswordVisibility}
								className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400'
							>
								{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>
					</div>

					<div className='text-center'>
						<button
							type='submit'
							className='w-full px-6 py-3 bg-[#09704A] text-white font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09704A]'
							disabled={loading}
						>
							{loading ? 'Submitting...' : 'Sign Up'}
						</button>
					</div>

					<div className='text-sm'>
						Already have an account?{' '}
						<Link to='/' className='font-bold text-[#09704A] hover:text-blue-600 underline'>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegistrationForm;
