// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard';
// import SuperAdminRegister from './components/SuperAdminRegister';
// import SalesUserForm from './components/SalesUserForm';
// import CustomerRegister from './components/CustomerRegister';
// import SalesPerformance from './components/SalesPerformance';
// import PropertyList from './components/PropertyList';  
// import PropertyDetail from './components/PropertyDetail'; 
// import PrivateRoute from './components/PrivateRoute';
// import NotFound from './components/NotFound';
// import Navbar from './components/Navbar';
// import PropertyForm from './components/PropertyForm';
// import About from './components/About';
// import ContactUs from './components/ContactUs';
// import Resource from './components/Resource';
// import Footer from './components/Footer';

// function App() {
//   const isAuthenticated = Boolean(localStorage.getItem('token'));
//   const userRole = localStorage.getItem('role');

//   const renderNavbarFooter = window.location.pathname !== '/login' && window.location.pathname !== '/superadmin/register';

//   return (
//     <Router>
//       {renderNavbarFooter && <Navbar />}
//       <div style={{ paddingTop: renderNavbarFooter ? '80px' : '0' }}>
        
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />

//           {/* Public Routes */}
//           <Route path="/superadmin/register" element={<SuperAdminRegister />} />

//           {/* Private Routes */}
//           <Route 
//             path="/register" 
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated}>
//                 <Register />
//               </PrivateRoute>
//             } 
//           />

//           <Route 
//             path="/sales-users/create" 
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="Sales Manager">
//                 <SalesUserForm />
//               </PrivateRoute>
//             } 
//           />

//           <Route 
//             path="/customers/register" 
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="Sales User">
//                 <CustomerRegister />
//               </PrivateRoute>
//             } 
//           />

//           <Route 
//             path="/dashboard" 
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated}>
//                 <Dashboard />
//               </PrivateRoute>
//             } 
//           />

//           <Route 
//             path="/sales-performance" 
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated} requiredRole={["Super Admin", "Admin", "Sales Manager", "Sales User"]}>
//                 <SalesPerformance />
//               </PrivateRoute>
//             } 
//           />

//           <Route 
//             path="/properties"  
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated}>
//                 <PropertyList />
//               </PrivateRoute>
//             } 
//           />   

//           <Route 
//             path="/about"  
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated}>
//                 <About />
//               </PrivateRoute>
//             } 
//           />         

//           <Route 
//             path="/contact-us"  
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated}>
//                 <ContactUs />
//               </PrivateRoute>
//             } 
//           /> 

//           <Route 
//             path="/resources" 
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated}>
//                 <Resource />
//               </PrivateRoute>
//             } 
//           />

//           <Route 
//             path="/properties/add" 
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated}>
//                 <PropertyForm />
//               </PrivateRoute>
//             } 
//           />

//           <Route 
//             path="/properties/edit/:id" 
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated}>
//                 <PropertyForm isEditing={true} />
//               </PrivateRoute>
//             } 
//           />

//           <Route 
//             path="/properties/:id" 
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated}>
//                 <PropertyDetail />
//               </PrivateRoute>
//             } 
//           />

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//       {renderNavbarFooter && <Footer />}
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SuperAdminRegister from './components/SuperAdminRegister';
import SalesUserForm from './components/SalesUserForm';
import CustomerRegister from './components/CustomerRegister';
import SalesPerformance from './components/SalesPerformance';
import PropertyList from './components/PropertyList';  
import PropertyDetail from './components/PropertyDetail'; 
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import PropertyForm from './components/PropertyForm';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Resource from './components/Resource';
import Footer from './components/Footer';
import PaymentForm from './components/PaymentForm';
import InvoiceDetail from './components/InvoiceDetail';
import InvoiceList from './components/InvoiceList';
import InvoicePaymentList from './components/InvoicePaymentList';


function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const userRole = localStorage.getItem('role');

  const renderNavbarFooter = window.location.pathname !== '/login' && window.location.pathname !== '/superadmin/register';

  return (
    <Router>
      {renderNavbarFooter && <Navbar />}
      <div style={{ paddingTop: renderNavbarFooter ? '80px' : '0',paddingBottom: renderNavbarFooter ? '110px' : '0' }}>
        
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          {/* Public Routes */}
          <Route path="/superadmin/register" element={<SuperAdminRegister />} />

          {/* Private Routes */}
          <Route 
            path="/register" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Register />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/sales-users/create" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="Sales Manager">
                <SalesUserForm />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/customers/register" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="Sales User">
                <CustomerRegister />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/sales-performance" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} requiredRole={["Super Admin", "Admin", "Sales Manager", "Sales User"]}>
                <SalesPerformance />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/properties"  
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PropertyList />
              </PrivateRoute>
            } 
          />   

          <Route 
            path="/about"  
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <About />
              </PrivateRoute>
            } 
          />         

          <Route 
            path="/contact-us"  
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ContactUs />
              </PrivateRoute>
            } 
          /> 

          <Route 
            path="/resources" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Resource />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/InvoicePaymentList" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <InvoicePaymentList />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/properties/add" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PropertyForm />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/properties/edit/:id" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PropertyForm isEditing={true} />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/properties/:id" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PropertyDetail />
              </PrivateRoute>
            } 
          />

          {/* Payment and Invoice Routes */}
          <Route 
            path="/payments/:invoiceId" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PaymentForm />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/invoices" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <InvoiceList />
              </PrivateRoute>
            } 
          />
          <Route
            path="/invoices/edit/:invoiceId"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <InvoiceList />
              </PrivateRoute>
            }
          />

          <Route 
            path="/invoices/:id" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <InvoiceDetail />
              </PrivateRoute>
            } 
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {renderNavbarFooter && <Footer />}
    </Router>
  );
}

export default App;
