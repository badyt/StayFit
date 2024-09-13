import { create } from 'zustand';
import config from '../../config';
import jwtDecode from 'jwt-decode';
const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
// Define the type of state
interface LoginStore {
  user: User | null;
  setUser: (user: User | null) => void
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => void;
  checkRefreshToken: () => Promise<User>;
}

// Create and export the store
const useLoginStore = create<LoginStore>((set) => ({
  user: {
    userId: '',
    accessToken: localStorage.getItem('accessToken')
  },

  setUser: newUser => set(() => ({ user: newUser })),

  login: async (credentials: LoginCredentials) => {
    if (credentials.email === '' || credentials.password === '') {
      throw new Error('email or password field is still empty');
    }
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    
    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    console.log("response " + data.accesstoken);
    if (data.accesstoken) {
      const decodedToken = jwtDecode<DecodedToken>(data.accesstoken);
      return {accessToken: data.accesstoken, userId: decodedToken.userId}
    } else{
      return data.accesstoken;
    }
  },

  logout: async () => {
    const response = await fetch(`${url}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    localStorage.removeItem('accessToken');
    set({ user: null });
  },

  checkRefreshToken: async () => {
    const result = await (await fetch(`${url}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })).json();
    const decodedToken = jwtDecode<DecodedToken>(result.accessToken);
    return {accessToken: result.accesstoken, userId: decodedToken.userId}
  }
}));

export default useLoginStore;