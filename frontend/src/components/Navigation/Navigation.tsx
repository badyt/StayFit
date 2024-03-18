
import { Link, useNavigate } from 'react-router-dom';
import useLoginStore from '../../stores/loginstore';
import { toast } from 'react-toastify';
import './Navigation.css';
const Navigation = () => {
    const { logout } = useLoginStore();
    const navigate = useNavigate();
    const logOutCallback = async () => {
        try {
            logout();
            navigate('/');
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    }
    return (
        <ul className='navigation-list'>
            <li><Link to='/'>Home</Link></li>
            {/* <li><Link to='/protected'>Protected</Link></li> */}
            <li><Link to='/register'>Register</Link></li>
            <li><button onClick={logOutCallback}>Log Out</button></li>
        </ul>
    )

}

export default Navigation;