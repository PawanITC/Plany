import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, History, BookOpen, Settings } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { label: 'Listings', icon: <LayoutDashboard size={20} />, path: '/admin/listings' },
    { label: 'Track', icon: <Target size={20} />, path: '/admin/listings/track' },
    { label: 'Logs', icon: <History size={20} />, path: '/admin/listings/logs' },
    { label: 'Tutorials', icon: <BookOpen size={20} />, path: '/tutorials', external: true },
    { label: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-white/60 backdrop-blur-xl border-r border-slate-200/50 flex flex-col h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-brand-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/30">P</div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">plany.</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          item.external ? (
            <a 
              key={item.label}
              href={item.path}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 rounded-xl hover:bg-slate-50 transition-all duration-300"
            >
              <div className="text-slate-400">{item.icon}</div>
              <span className="font-medium">{item.label}</span>
            </a>
          ) : (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-50 text-brand-600 shadow-sm shadow-brand-100/50' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`${isActive ? 'text-brand-500' : 'text-slate-400'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          )
        ))}
      </nav>

      <div className="p-6">
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute inset-0 bg-brand-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl blur-lg"></div>
          <p className="text-sm font-medium opacity-90 mb-1">Managing</p>
          <p className="font-bold cursor-pointer hover:text-brand-100 transition-colors flex items-center justify-between">
            Minima Sliding
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full ml-2">PRO</span>
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
