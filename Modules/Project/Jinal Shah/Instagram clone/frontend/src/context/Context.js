import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

const UserProvider = (props) => {

	const [userID, setUserID] = useState("");

	useEffect(() => {
		setUserID(localStorage.getItem('user'))
		console.log(userID);
	})


	return (
		<UserContext.Provider
			value={{
				userID,
				setUserID
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};
export { UserProvider, UserContext };
