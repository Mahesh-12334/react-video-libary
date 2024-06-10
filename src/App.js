import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import { Home} from './components/Home';
import { AdminLogin } from './components/Admin-login';
import { AdminDashBoard } from './components/Admin-Dashboard';
import { AdminError } from './components/Admin-error';
import { AddVideo } from './components/Admin-add-video';
import { AdminUpdateVideo } from './components/Admin-update-video';
import { AdminDeleteVideo } from './components/Admin-delete-video';
import { useCookies } from 'react-cookie';
import { AdminSignout } from './components/Admin-signout';
import { UserRegister } from './components/user-register';
import { UserDashboard } from './components/user-dashboard';
import { UserError } from './components/user-erroe';

function App() {

  const[cookie,setCookie,removeCookie] = useCookies("Admin-id");

  return (
    <div className='container-fluid fragment'>
    <BrowserRouter>
    <header>
    <div className='h2 fw-bold'><Link to={'/'} className='text-decoration-none text-white'>VIDEO-LIBRARY</Link></div>
    <div>
      {
      (cookie['Admin-id']==undefined)?<Link to={'Admin-Login'} className='text-decoration-none btn btn-danger text-white' >Admin Login</Link>:<AdminSignout></AdminSignout>
      }
      </div>
    </header>
    <section>
    <Routes>
          <Route path='Admin-Login' element={<AdminLogin></AdminLogin>}></Route>
          <Route path='Admin-Error' element={<AdminError></AdminError>}></Route>
          <Route path='Admin-DashBoard' element={<AdminDashBoard/>}></Route>
          <Route path='Add-video' element={<AddVideo/>}></Route>
          <Route path='Update-video/:id' element={<AdminUpdateVideo/>}></Route>
          <Route path='Delete-video/:id' element={<AdminDeleteVideo/>}></Route>
          <Route path='signout' element={<AdminSignout></AdminSignout>}></Route>
          <Route path='user-register' element={<UserRegister></UserRegister>}></Route>
          <Route path='user-dashboard' element={<UserDashboard/>}></Route>
          <Route path='user-error' element={<UserError/>}></Route>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='https://mahesh-12334.github.io/react-video-libary/' element={<Home/>}></Route>
          <Route path='*' element={<h1 style={{height:'100vh'}} className='text-center text-warning'> 404 Error - we can't find any page on this path</h1>}></Route>
    </Routes>
    </section>
    </BrowserRouter>
    </div>
  );
}

export default App;
