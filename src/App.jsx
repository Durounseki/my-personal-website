import './App.css';
import AuthProvider from './AuthProvider';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <main>
          <Header/>
          <article className="content">
            <Outlet />
          </article>
          <Footer/>
      </main>
    </AuthProvider>
  )
}

export default App;
