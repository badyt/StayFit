import { Navigate } from "react-router-dom";
import useLoginStore from '../stores/loginstore';
const Content = () => {
    // Could have something here to check for the time when the accesstoken expires
    // and then call the refresh_token endpoint to get a new accesstoken automatically
    const { user } = useLoginStore();
    if (!user?.accessToken)
        return <Navigate to="/login" />;
    return (
        <div>
            This is the content.
        </div>
    );
}

export default Content;