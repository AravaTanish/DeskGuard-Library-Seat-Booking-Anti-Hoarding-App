import {Navigate} from "react-router-dom";
import useAdminStore from "../zustand/AdminStore.js";
import Loading from "../components/LoadingScreen.jsx";
const PublicRoute = ({ children }) => {
	const { isLoggedIn, loading } = useAdminStore();

	if(loading){
		return <Loading message="Loading..." />;
	}

	if(isLoggedIn){
		return <Navigate to="/admin/dashboard" />;
	}
	return children;
}
export default PublicRoute;