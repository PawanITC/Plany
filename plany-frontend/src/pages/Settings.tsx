import { useState } from 'react';
import { Upload, FileText, Check, Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  const tabs = ['Account', 'Letter Settings', 'Letters', 'Councils', 'Users'];
  const [activeTab, setActiveTab] = useState('Letter Settings');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight mb-2">Settings</h1>
      <p className="text-slate-500 mb-8 font-medium">Manage your account, templates, and company configuration.</p>
      
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50">
        <div className="flex gap-1 border-b border-slate-200/60 p-2 bg-slate-50/50 overflow-x-auto">
          {tabs.map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-white text-brand-600 shadow-sm border border-slate-200/50' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-3 pr-4">
            <button className="px-5 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors">Preview</button>
            <button className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg shadow-md shadow-brand-500/20 transition-colors flex items-center gap-2">
              <Check size={18} /> Save
            </button>
          </div>
        </div>
        
        <div className="p-8 min-h-[400px] bg-white/40">
          {activeTab === 'Letter Settings' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-8">
                  <div className="w-24 font-semibold text-slate-700">Font</div>
                  <div className="flex-1 space-y-2">
                     <p className="text-xs text-slate-500 font-medium">Family</p>
                     <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-700 font-medium">
                        <option>Roboto</option>
                        <option>Inter</option>
                        <option>Open Sans</option>
                     </select>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex-1 space-y-2">
                     <p className="text-xs text-slate-500 font-medium">Size</p>
                     <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-700 font-medium">
                        <option>10pt</option>
                        <option>11pt</option>
                        <option>12pt</option>
                     </select>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-8 pb-8 border-b border-slate-100">
                <div className="w-24 font-semibold text-slate-700 mt-2">Background</div>
                <div className="flex-1 flex gap-4">
                  <button className="px-6 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
                    <FileText size={18} className="text-slate-400" /> Template
                  </button>
                  <button className="px-6 py-2.5 bg-brand-100 text-brand-700 font-semibold rounded-xl hover:bg-brand-200 transition-colors flex items-center gap-2">
                    <Upload size={18} /> Upload
                  </button>
                </div>
              </div>

               <div className="flex items-start gap-8">
                <div className="w-24 font-semibold text-slate-700 mt-4">Preview</div>
                <div className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50/50 flex items-center justify-center min-h-[200px]">
                    <p className="text-slate-400 font-medium">Upload a background to preview your letter</p>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'Letter Settings' && (
            <div className="flex flex-col items-center justify-center h-[300px] text-slate-400 animate-in fade-in zoom-in-95 duration-500">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                 <SettingsIcon size={24} className="text-slate-300" />
               </div>
               <p className="font-medium text-lg text-slate-500">{activeTab} configuration</p>
               <p className="text-sm">This section is currently under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
