import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				// <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
				<div className='mt-1'>
				<button onClick={logout} className='btn btn-sm'>Logout</button>
				</div>			
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;
