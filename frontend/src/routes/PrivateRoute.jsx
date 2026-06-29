import {Navigate} from "react-router-dom";
import useAdminStore from "../zustand/AdminStore.js";
import LoadingScreen from "../components/LoadingScreen.jsx";

const PrivateRoute = ({ children }) => {
	

	const { isLoggedIn, loading } = useAdminStore();
	if(loading){
		return <LoadingScreen message="Loading..." />;
	}
	if(!isLoggedIn){
		return <Navigate to="/admin/login" />;
	}
	return children;
}
export default PrivateRoute;