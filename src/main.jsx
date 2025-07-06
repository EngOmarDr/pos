import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './main.css'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CompletedInvoicesPage from './pages/CompletedInvoicesPage'
// import CustmersDebtsPage from './pages/CustmersDebtsPage'
import PendingInvoicesPage from './pages/PendingInvoicesPage.jsx'
import ShiftClosePage from './pages/ShiftClosePage.jsx'
import App from './App.jsx'
import CustmerScreen from './pages/CustmerScreen.jsx'

const root = createRoot(document.getElementById('root'))
  root.render(
  // <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/custmer-screen' element={<CustmerScreen/>}/>
      <Route path='/' element={<App/>}>
        <Route index element={<HomePage/>}/>
        <Route path='completed-invoices' element={<CompletedInvoicesPage/>}/>
        {/* <Route path='custmers-debts' element={<CustmersDebtsPage/>}/> */}
        <Route path='pending-invoices' element={<PendingInvoicesPage/>}/>
        <Route path='shift-close' element={<ShiftClosePage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  // </StrictMode>,
)
