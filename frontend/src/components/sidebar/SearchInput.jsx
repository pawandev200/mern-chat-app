import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	// handling the form, after submission, 
	const handleSubmit = (e) => {
		e.preventDefault();
		// replacing the search: by search.trim(). trim(): remove leading and trailing whitespaces
		if (!search.trim()) return; // if search bar is empty 
		if (search.trim().length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		// managing the upper and lowercase for the search.. make it lowercase to search the conversation 
		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.trim().toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				// extracting the value from the inputted search bar 
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
             {/* search icon.. submit type to search something */}
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />   
			</button>
		</form>
	);
};
export default SearchInput;

// STARTER CODE SNIPPET
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
// 	return (
// 		<form className='flex items-center gap-2'>
// 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' /> // search icon
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;