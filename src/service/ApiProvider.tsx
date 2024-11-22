import React from 'react';
import Api from "../entities/api/Api";

const ApiContext = React.createContext<Api>({} as Api);

type Props = {
    children: React.ReactNode;
}

const ApiProvider: React.FC<Props> = ({ children } : Props) => {
    const context = React.useContext(ApiContext);

    return <ApiContext.Provider value={context}>{children}</ApiContext.Provider>;
}

export default ApiProvider;