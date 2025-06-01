import { createContext, useContext } from 'react';

export interface NAMEExternalContextProps {}

interface NAMEInternalContextProps {}

const NAMEContext = createContext<
  NAMEExternalContextProps & NAMEInternalContextProps
>({});

interface ProviderProps extends NAMEExternalContextProps {
  children: React.ReactNode;
}

export function NAMEProvider({ children, ...props }: ProviderProps) {
  const internalContext: NAMEInternalContextProps = {};

  return (
    <NAMEContext.Provider value={{ ...props, ...internalContext }}>
      {children}
    </NAMEContext.Provider>
  );
}

export function useNAMEContext() {
  const context = useContext(NAMEContext);

  if (typeof context === 'undefined') {
    throw new Error('useNAMEContext must be used within NAMEContext');
  }

  return context;
}
