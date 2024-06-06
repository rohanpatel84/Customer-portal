import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Tickets from './components/Ticket/Ticket';
import Invoices from './components/Invoice/Invoice';
import Subscription from './components/Subscription/Subscription';
import Quotes from './components/Quotes/Quotes';
import ChangePassword from './components/Change Password/ChangePassword';
import ContactUS from './components/ContactUS/ContactUS';
import Messages from './components/Messages/Messages';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import FileUpload from './components/FileInput/FileUpload';
import Logout from './components/Logout/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TicketDetail from './components/Ticket/TicketDetail';
import FeedBack from './components/Feedback/Feedback';
import TableOne from './components/Tables/TableOne';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Login" />
              <Login />
            </>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/ecommerce"
          element={
            <ProtectedRoute>
              <ECommerce />
            </ProtectedRoute>
          }
        />
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route path="/feedback/:id" element={<FeedBack />} />
        <Route path="/tickets" element={<Tickets username={''} password={''} />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route
          path="/invoices"
          element={
            <>
              <PageTitle title="Invoices" />
              <Invoices username={''} password={''} />
            </>
          }
        />
        <Route
          path="/feedback"
          element={
            <>
              <PageTitle title="FeedBack" />
              <FeedBack />
            </>
          }
        />
        <Route
          path="/quotes"
          element={
            <>
              <PageTitle title="Quotes" />
              <Quotes username={''} password={''} />
            </>
          }
        />
        <Route
          path="/subscription"
          element={
            <>
              <PageTitle title="Subscription" />
              <Subscription />
            </>
          }
        />
        <Route
          path="/changepassword"
          element={
            <>
              <PageTitle title="Change Password" />
              <ChangePassword username={''} password={''} />
            </>
          }
        />
        <Route
          path="/contactus"
          element={
            <>
              <PageTitle title="Contact Us" />
              <ContactUS />
            </>
          }
        />
        <Route
          path="/messages"
          element={
            <>
              <PageTitle title="Messages" />
              <Messages username={''} password={''} />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart" />
              <Chart />
            </>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <>
              <PageTitle title="Forgot Password" />
              <ForgotPassword username={''} password={''} />
            </>
          }
        />
        <Route
          path="/fileupload"
          element={
            <>
              <PageTitle title="File Upload" />
              <FileUpload />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              {/* <SignUp /> */}
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Table One" />
              <TableOne username={''} password={''} />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
