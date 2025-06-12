import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;