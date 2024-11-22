import React, { Context, ReactNode } from 'react';
import User from "../entities/domain/User";

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext: Context<UserContextType | null> = React.createContext<UserContextType | null>(null);

type Props = { children: ReactNode };

const UserProvider: React.FC<Props> = ({ children }: Props) => {
    const [user, setUser] = React.useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;