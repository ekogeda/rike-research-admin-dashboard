import LogoSVG from '../assets/research_connect_logo.svg';

const Footer = () => {
	return (
		<footer className='w-full mx-auto border-t'>
			<div className='container xl:w-[1197px] mx-auto py-8 px-4 space-y-6'>
				{/* <div>
					<img src={LogoSVG} alt='Logo' className='h-8' />
				</div> */}

				<div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8'>
					<div>
						<img src={LogoSVG} alt='Logo' className='h-8' />
					</div>

					<div>
						<h3 className='text-base font-bold mb-2'>About</h3>
						<ul className='space-y-2'>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Company Overview
								</a>
							</li>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Careers
								</a>
							</li>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Press & Media
								</a>
							</li>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Testimonials
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-base font-bold mb-2'>Resources</h3>
						<ul className='space-y-2'>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Blog
								</a>
							</li>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Help Center
								</a>
							</li>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Webinars & Events
								</a>
							</li>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Case Studies
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-base font-bold mb-2'>Support & Contact</h3>
						<ul className='space-y-2'>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Contact Us
								</a>
							</li>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Technical Support
								</a>
							</li>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Feedback
								</a>
							</li>
							<li className='text-sm mb-1'>
								<a href='#' className='text-[#717171] hover:underline'>
									Community Forum
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className='flex flex-col md:flex-row items-center justify-between text-gray-600 p-4 text-sm space-y-2 border-t'>
					<p>&copy; {new Date().getFullYear()} Research Connect · All rights reserved.</p>
					<div className='flex items-center space-x-4'>
						<a href='#' className='hover:underline'>
							Term or use
						</a>
						<a href='#' className='hover:underline'>
							Privacy policy
						</a>
						<a href='#' className='hover:underline'>
							Security
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
