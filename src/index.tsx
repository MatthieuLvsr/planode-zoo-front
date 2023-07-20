import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { AnimalForm, Animals, App, Enclosures, Navbar } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context';
import { EnclosureForm } from './components/Forms/EnclosureForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/animals" element={<Animals/>}/>
          <Route path="/animals/add" element={<AnimalForm/>}/>
          <Route path="/enclosures" element={<Enclosures/>}/>
          <Route path="/enclosures/add" element={<EnclosureForm/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
