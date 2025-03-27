import React from 'react';
import { RouterProvider } from 'react-router';
import { route } from './router';

function App() {

  return (
    <>
        <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
