import { Outlet } from 'react-router';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

export const MainLayout = () => {
    return (
        <div className='min-h-screen flex flex-col bg-gray-50/50 overflow-x-clip'>
            <Header />
            <main className='flex-grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};