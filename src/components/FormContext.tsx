import React, { useState } from 'react';

interface Form {
    name: string,
    gender: 'male' | 'female',
    traits: number[]
}

const FormContext = React.createContext([{}, () => {}]);

const FormProvider = (props: { children: React.ReactNode; }) => {
    const [state, setState] = useState({} as Form)
    return (
        <FormContext.Provider value={[state, setState]}>
            {props.children}
        </FormContext.Provider>
    );
};

export { FormContext, FormProvider };