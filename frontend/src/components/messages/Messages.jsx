import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();


	// to scroll down to automatically to last message after opening 
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
        // overflow is for sccroling at side 
		<div className='px-4 flex-1 overflow-auto'>    
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

{/* if messages is in loading state call messageSkeleton */}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
{/* if no messages found then show this message */}
			{!loading && messages.length === 0 && (
				// <p className='text-center'>Send a message to start the conversation</p>
				<p className='text-center text-gray-300'>Send a message to start the conversation</p>

			)}
		</div>
	);
};
export default Messages;

// STARTER CODE SNIPPET
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>  // overflow is for sccroling at side 
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 		</div>
// 	);
// };
// export default Messages;