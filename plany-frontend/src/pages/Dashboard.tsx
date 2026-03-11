import { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle2, XCircle, Clock, ChevronDown, MapPin, Printer, RefreshCw } from 'lucide-react';
import { listingService, Listing } from '../services/listingService';

const getStatusColor = (status: string) => {
  if (!status) return 'bg-slate-100 text-slate-700 border-slate-200';
  const s = status.toLowerCase();
  if (s.includes('granted') || s === 'approved') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (s.includes('pending') || s === 'processing') return 'bg-amber-100 text-amber-700 border-amber-200';
  if (s.includes('refused') || s === 'denied') return 'bg-rose-100 text-rose-700 border-rose-200';
  if (s.includes('withdrawn')) return 'bg-slate-100 text-slate-700 border-slate-200';
  return 'bg-slate-100 text-slate-700 border-slate-200';
};

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListings, setSelectedListings] = useState<number[]>([]);
  
  // Data state
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search filter simple state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Apify Sync state
  const [isSyncing, setIsSyncing] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async (query?: { keyword?: string; status?: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      let data;
      if (query && (query.keyword || query.status)) {
         data = await listingService.search(query);
      } else {
         data = await listingService.getAll();
      }
      setListings(data);
    } catch (err: any) {
      console.error("Failed to load listings", err);
      setError("Unable to connect to the Plany backend. Please ensure the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      setError(null);
      // Hardcoding default council=1 for scaffold demonstration
      const councilId = 1; 
      
      // Step 1: Trigger the scrape actor
      const triggerRes = await listingService.triggerScrape(councilId);
      
      // Step 2: Since it's a simulated or fast run, immediately process the resultant dataset
      await listingService.processScrape(councilId, triggerRes.runId);
      
      // Step 3: Refresh the dashboard Grid
      await fetchListings();
      
    } catch (err: any) {
      console.error("Sync failed", err);
      setError("Failed to sync data from the Apify Scraper.");
    } finally {
      setIsSyncing(false);
    }
  };

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
            onClick={handleSync}
            disabled={isSyncing}
            className="px-5 py-2.5 bg-white text-brand-600 font-medium rounded-xl border border-brand-200 shadow-sm transition-all hover:bg-brand-50 hover:border-brand-300 disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw size={18} className={isSyncing ? "animate-spin text-brand-500" : "text-brand-500"} />
            {isSyncing ? "Syncing..." : "Sync Data"}
          </button>
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
          Showing <strong className="text-slate-800">{listings.length}</strong> results
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
           <XCircle size={20} className="text-rose-500" />
           {error}
        </div>
      )}

      {isLoading ? (
        <div className="glass-panel rounded-2xl p-8 min-h-[300px] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 bg-brand-100 rounded-full mb-4 flex items-center justify-center">
                   <div className="w-6 h-6 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-slate-500 font-medium tracking-wide">Connecting to API Gateway Serverless Backend...</p>
            </div>
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {listings.length === 0 && !error && (
          <div className="col-span-2 text-center py-12 text-slate-400 font-medium">No listings found.</div>
        )}
        {listings.map((listing, i) => (
          <div 
            key={listing.id} 
            className={`glass-panel rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group relative cursor-pointer border flex flex-col h-full ${selectedListings.includes(listing.id) ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-white/50 hover:border-brand-200'}`}
            onClick={() => toggleSelection(listing.id)}
            style={{ animationDelay: (i * 100) + 'ms' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-brand-600 transition-colors line-clamp-1">{listing.address}</h3>
                <p className="text-sm text-slate-500 font-medium">{listing.council?.name || 'Unknown Council'}: <span className="text-slate-700">{listing.referenceNumber}</span></p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(listing.status)}`}>
                {listing.status || 'Unknown'}
              </div>
            </div>
            
            <p className="text-slate-600 mb-6 line-clamp-2 text-sm flex-1">
              {listing.description}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <Clock size={16} />
                Decision: {listing.decisionDate ? new Date(listing.decisionDate).toLocaleDateString() : 'N/A'}
              </div>
              
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedListings.includes(listing.id) ? 'bg-brand-500 border-brand-500' : 'border-slate-300'}`}>
                {selectedListings.includes(listing.id) && <CheckCircle2 size={14} className="text-white" />}
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

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
                  <input 
                    type="text" 
                    placeholder="Comma separated terms e.g. rear extension, kitchen" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsModalOpen(false);
                        fetchListings({ keyword: searchTerm });
                      }
                    }}
                  />
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
                <button 
                  onClick={() => {
                     setIsModalOpen(false);
                     fetchListings({ keyword: searchTerm });
                  }}
                  className="px-8 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/30 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
