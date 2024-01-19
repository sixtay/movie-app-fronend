import React, { useReducer, createContext } from 'react';

export default (reducer: any, actions: any, defaultValue: any): any => {
  const Context = createContext(defaultValue);

  const Provider = ({ children }: { children: JSX.Element[] }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions: Record<string, any> = {};

    Object.keys(actions).map((key) => {
      boundActions[key] = actions[key](dispatch);
      return key;
    });
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export type ReducerStoreContext = {
  state: {
    isHydrated: boolean;
  };
  hydrate: () => Promise<void>;
};
