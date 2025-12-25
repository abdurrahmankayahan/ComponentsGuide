import React from 'react';


import LoginPage from './LoginPage';

// Utility function to generate prop definitions from component props interface
function generatePropDefinitions<T extends Record<string, any>>(
  propMap: Record<
    keyof T,
    {

      description?: string;

    }
  >,
): PropDefinition[] {
  return Object.entries(propMap).map(([name, config]) => ({
    name,
    description: config.description,

  }));
}

export interface PropDefinition {
  name: string;
  description?: string;
}


export interface PagesItem {
  id: string;
  name: string;
  description: string;
  Preview: React.ComponentType<any>;
}

export const pagesRegistry: PagesItem[] = [
{
    id:"login-page",
    name:"Login Page",
    description:"Kullanıcı giriş sayfası",
    Preview: () => <LoginPage />
}
  
];
