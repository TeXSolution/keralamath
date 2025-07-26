import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Users, HelpCircle, LayoutDashboard, Menu, LogOut } from 'lucide-react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin-dashboard/dash' },
        { icon: Users, label: 'Users', path: '/admin-dashboard/users' },
        { icon: HelpCircle, label: 'Questions', path: '/admin-dashboard/questions' },
        { icon: HelpCircle, label: 'subjects list', path: '/admin-dashboard/sub-list' },
        { icon: HelpCircle, label: 'subjects list new', path: '/admin-dashboard/sub-list2' },
        {



            icon: LogOut,
            label: 'Logout',
            onClick: () => {
                console.log('Logging out...');

                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/');


            }
        },
    ];

    return (
        <div>
            <button
                className="md:hidden fixed top-4 left-4 p-2 bg-black text-white rounded-full z-50"
                onClick={toggleSidebar}
            >
                <Menu size={28} />
            </button>

            <div
                className={`fixed top-0 left-0 h-screen bg-black text-white p-4 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 z-40`}
            >
                <div className="flex items-center gap-2 mb-8 px-4">
                    <LayoutDashboard size={24} />
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>

                <nav>
                    {menuItems.map((item) => (
                        item.label === 'Logout' ? (
                            <button
                                key={item.label}
                                onClick={item.onClick}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-700 hover:text-white transition-colors w-full text-left"
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </button>
                        ) : (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white text-black' : 'text-gray-300 hover:bg-gray-800'
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        )
                    ))}
                </nav>


            </div>
        </div>
    );
};

export default Sidebar;
