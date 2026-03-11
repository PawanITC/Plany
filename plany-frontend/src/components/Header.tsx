import { Bell, Search, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 bg-white/40 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-8 sticky top-0 z-10 w-full animate-in slide-in-from-top duration-500">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search applications anywhere..." 
            className="w-full bg-slate-50/50 border border-slate-200/60 rounded-full pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/50 focus:bg-white transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-4">
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={24} />
          <span className="absolute 0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-pulse border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200"></div>

        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 group-hover:border-brand-300 transition-colors shadow-sm">
            <UserCircle size={24} />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-slate-700">Simon P.</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
