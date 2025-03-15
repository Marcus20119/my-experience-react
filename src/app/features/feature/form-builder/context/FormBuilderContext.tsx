import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';
import { DEFAULT_FORM_NAME } from '../model';

export interface FormBuilderExternalContextProps {}

interface FormBuilderInternalContextProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

const FormBuilderContext = createContext<
  FormBuilderExternalContextProps & FormBuilderInternalContextProps
>({
  name: DEFAULT_FORM_NAME,
  setName: () => 0,
});

interface ProviderProps extends FormBuilderExternalContextProps {
  children: React.ReactNode;
}

export function FormBuilderProvider({ children, ...props }: ProviderProps) {
  const [name, setName] = useState(DEFAULT_FORM_NAME);

  const internalContext: FormBuilderInternalContextProps = {
    name,
    setName,
  };

  return (
    <FormBuilderContext.Provider value={{ ...props, ...internalContext }}>
      {children}
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilderContext() {
  const context = useContext(FormBuilderContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'useFormBuilderContext must be used within FormBuilderContext',
    );
  }

  return context;
}
