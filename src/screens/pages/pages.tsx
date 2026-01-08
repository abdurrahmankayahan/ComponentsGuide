import React from 'react';


import LoginPage from './LoginPage';
import ChangePasswordPage from './ChangePasswordPage';
import RegisterPage from './RegisterPage';
import BookingPage from './BookingPage';

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
    id:"register-page",
    name:"Register Page",
    description:"Kayıt oluşturma sayfası",
    Preview: () => <RegisterPage />
},
{
    id:"login-page",
    name:"Login Page",
    description:"Kullanıcı giriş sayfası",
    Preview: () => <LoginPage />
},
{
    id:"change-password-page",
    name:"Change Password Page",
    description:"Şifre değiştirme sayfası",
    Preview: () => <ChangePasswordPage />
},
{
    id:"booking-page",
    name:"Booking Page",
    description:"Randevu alma sayfası",
    Preview: () => <BookingPage />
},
  
];
