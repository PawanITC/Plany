import { useState } from 'react';
import { Search, Filter, CheckCircle2, XCircle, Clock, ChevronDown, MapPin, Printer } from 'lucide-react';

const DUMMY_LISTINGS = [
  { id: 1, ref: '26/10058', council: 'New Forest', status: 'Granted', address: 'MARL COTTAGE, MARL LANE, FORDINGBRIDGE SP6 1JR', desc: '2no. outbuildings for use as garden office and gym', date: '05/03/2026' },
  { id: 2, ref: '25/02582/HOU', council: 'Hart', status: 'Pending', address: '34 Cove Road Fleet Hampshire GU51 2RN', desc: 'Erection of a detached outbuilding', date: '04/03/2026' },
  { id: 3, ref: '26/00100/LBC', council: 'Chichester', status: 'Refused', address: 'Herons Farm Village Road Kirdford Billingshurst', desc: 'Replacement and relocation of existing swimming pool.', date: '06/03/2026' },
  { id: 4, ref: '26/01293/FUL', council: 'Camden', status: 'Withdrawn', address: '12 Bloomsbury Square, London, WC1A 2LP', desc: 'Change of use from office to residential.', date: '01/03/2026' },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Granted': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Refused': return 'bg-rose-100 text-rose-700 border-rose-200';
    case 'Withdrawn': return 'bg-slate-100 text-slate-700 border-slate-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListings, setSelectedListings] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedListings(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out max-w-7xl mx-auto">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight">Listings</h1>
          <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
            <MapPin size={16} className="text-brand-500" /> Nationwide Live Search
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            disabled={selectedListings.length === 0}
            className="px-5 py-2.5 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 shadow-sm transition-all hover:bg-slate-50 hover:border-brand-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group"
          >
            <Printer size={18} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
            Print Selected ({selectedListings.length})
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl shadow-lg shadow-brand-500/30 transition-all hover:scale-105 active:scale-95 duration-200 flex items-center gap-2"
          >
            <Filter size={18} />
            Advanced Search
          </button>
        </div>
      </div>
      
      {/* Filters Summary Bar */}
      <div className="glass-panel rounded-2xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-slate-700 mr-2">Status:</span>
          {['Pending', 'Granted', 'Refused', 'Withdrawn'].map(s => (
            <span key={s} className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(s)} cursor-pointer hover:shadow-md transition-shadow`}>
              {s}
            </span>
          ))}
        </div>
        <div className="text-sm text-slate-500 font-medium hidden sm:block">
          Showing <strong className="text-slate-800">5166</strong> results
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {DUMMY_LISTINGS.map((listing, i) => (
          <div 
            key={listing.id} 
            className={`glass-panel rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group relative cursor-pointer border ${selectedListings.includes(listing.id) ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-white/50 hover:border-brand-200'}`}
            onClick={() => toggleSelection(listing.id)}
            style={{ animationDelay: (i * 100) + 'ms' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-brand-600 transition-colors line-clamp-1">{listing.address}</h3>
                <p className="text-sm text-slate-500 font-medium">{listing.council}: <span className="text-slate-700">{listing.ref}</span></p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(listing.status)}`}>
                {listing.status}
              </div>
            </div>
            
            <p className="text-slate-600 mb-6 line-clamp-2 text-sm">
              {listing.desc}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <Clock size={16} />
                Decision: {listing.date}
              </div>
              
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedListings.includes(listing.id) ? 'bg-brand-500 border-brand-500' : 'border-slate-300'}`}>
                {selectedListings.includes(listing.id) && <CheckCircle2 size={14} className="text-white" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">Search Listings</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Search Terms</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input type="text" placeholder="Comma separated terms e.g. rear extension, kitchen" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Status</label>
                <div className="flex gap-4">
                  {['Pending', 'Granted', 'Withdrawn', 'Refused'].map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-brand-500 rounded border-slate-300 focus:ring-brand-500" defaultChecked={s === 'Granted'} />
                      <span className="text-sm font-medium text-slate-600">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date From</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors" />
                </div>
                 <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date To</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors" />
                </div>
              </div>

               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Councils</label>
                <button className="w-full bg-brand-50 text-brand-600 border border-brand-200 rounded-xl px-4 py-3 font-semibold flex items-center justify-between hover:bg-brand-100 transition-colors">
                  57 Selected
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-200/50 rounded-xl transition-colors">History</button>
              <div className="flex gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors">Close</button>
                <button className="px-8 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/30 transition-colors">Search</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
