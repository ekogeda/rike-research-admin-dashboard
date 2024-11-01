import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { loginUser } from '../../../services/authService';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const { userToken, login, user } = useContext(AuthContext);
	const [formData, setFormData] = useState({ email: '', password: '' });
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate('/dashboard');
	}, [user, navigate]);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await loginUser(formData);
			delete response.statusCode;

			userToken(response.token);

			delete response.token;

			login(response);

			toast.success(`Welcome ${response.user.firstName}!`);

			navigate('/dashboard');
		} catch (error) {
			toast.error('Login failed. Please check your credentials.');
			console.error('There was an error!', error.response || error);
		}
	};

	return (
		<div className='flex justify-center items-center'>
			<div className='bg-white md:p-6 w-full max-w-md space-y-8'>
				<div className='text-center md:text-left'>
					<h2 className='text-xl md:text-2xl font-bold mb-1 text-gray-800'>Hi, Welcome Back!</h2>
					<p className='text-sm md:text-base text-[#8F95B2]'>Login to your account to continue exploring.</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4'>
					{/* Email Address */}
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
								placeholder='Enter your email address'
								className='w-full pl-10 p-3 border rounded-lg focus:ring-[#09704A] focus:border-[#09704A] focus:outline-none'
								onChange={handleInputChange}
							/>
						</div>
					</div>

					{/* Password */}
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
								onChange={handleInputChange}
							/>
							<span onClick={togglePasswordVisibility} className='absolute right-3 top-4 cursor-pointer text-gray-400'>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>
					</div>

					{/* Remember Me and Forgot Password */}
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<input
								type='checkbox'
								id='rememberMe'
								checked={rememberMe}
								onChange={handleRememberMeChange}
								className='h-4 w-4 text-[#09704A] focus:ring-[#09704A] border-gray-300 rounded'
							/>
							<label htmlFor='rememberMe' className='ml-2 text-sm text-gray-700'>
								Remember Me
							</label>
						</div>

						<a href='#' className='text-sm text-[#09704A] hover:text-[#06593C] transition-colors'>
							Forgot password?
						</a>
					</div>

					{/* Submit Button */}
					<div>
						<button
							type='submit'
							className='w-full bg-[#09704A] text-white px-6 py-3 rounded-full hover:bg-[#06593C] transition-colors'
						>
							Login
						</button>
					</div>

					<div className='text-sm'>
						Not registered yet?{' '}
						<Link to='/register' className='text-[#006633] hover:text-blue-600 underline'>
							Create an Account
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
