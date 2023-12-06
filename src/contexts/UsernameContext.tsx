// import {createContext} from 'react'

// export const LoginContext = createContext("");

import { createContext, Dispatch, SetStateAction } from 'react';

interface LoginContextProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

export const LoginContext = createContext<LoginContextProps>({
  username: '',
  setUsername: () => {} // a dummy function
});
