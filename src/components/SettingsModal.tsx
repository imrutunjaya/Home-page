import React from 'react';
import { X, Layout, List, Square, Eye, Type, Search, Filter, Grid } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme: boolean;
  isThinText: boolean;
  onToggleThinText: () => void;
  showCardBorders: boolean;
  onToggleCardBorders: () => void;
  viewMode: 'list' | 'card' | 'single';
  onViewModeChange: (mode: 'list' | 'card' | 'single') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterCategory: string;
  onCategoryChange: (category: string) => void;
  filterStatus: string;
  onStatusChange: (status: string) => void;
  categories: string[];
  totalSites: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isDarkTheme,
  isThinText,
  onToggleThinText,
  showCardBorders,
  onToggleCardBorders,
  viewMode,
  onViewModeChange,
  searchTerm,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  filterStatus,
  onStatusChange,
  categories,
  totalSites
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
        isDarkTheme ? 'bg-black' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-bold'}`}>
              Settings
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkTheme 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-900' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className={`flex items-center gap-2 text-sm mb-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                <Search size={16} />
                Search Sites
              </label>
              <input
                type="text"
                placeholder="Search titles, URLs, tags..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkTheme 
                    ? 'bg-black border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                } ${isThinText ? 'font-light' : ''}`}
              />
            </div>

            {/* Filters */}
            <div>
              <label className={`flex items-center gap-2 text-sm mb-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                <Filter size={16} />
                Filters
              </label>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={filterCategory}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    isDarkTheme 
                      ? 'bg-black border-gray-700 text-white' 
                      : 'bg-white border-gray-200 text-gray-900'
                  } ${isThinText ? 'font-light' : ''}`}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    isDarkTheme 
                      ? 'bg-black border-gray-700 text-white' 
                      : 'bg-white border-gray-200 text-gray-900'
                  } ${isThinText ? 'font-light' : ''}`}
                >
                  <option value="">All Status</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            {/* Total Sites */}
            <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                  Total Sites
                </span>
                <span className={`text-lg ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-bold'}`}>
                  {totalSites}
                </span>
              </div>
            </div>

            {/* View Mode */}
            <div>
              <label className={`flex items-center gap-2 text-sm mb-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                <Layout size={16} />
                View Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onViewModeChange('list')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                    viewMode === 'list'
                      ? isDarkTheme
                        ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                        : 'bg-blue-50 border-blue-500 text-blue-600'
                      : isDarkTheme
                        ? 'border-gray-700 text-gray-400 hover:bg-gray-900'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List size={20} />
                  <span className={`text-xs ${isThinText ? 'font-light' : ''}`}>List</span>
                </button>
                
                <button
                  onClick={() => onViewModeChange('card')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                    viewMode === 'card'
                      ? isDarkTheme
                        ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                        : 'bg-blue-50 border-blue-500 text-blue-600'
                      : isDarkTheme
                        ? 'border-gray-700 text-gray-400 hover:bg-gray-900'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Square size={20} />
                  <span className={`text-xs ${isThinText ? 'font-light' : ''}`}>Card</span>
                </button>
                
                <button
                  onClick={() => onViewModeChange('single')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                    viewMode === 'single'
                      ? isDarkTheme
                        ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                        : 'bg-blue-50 border-blue-500 text-blue-600'
                      : isDarkTheme
                        ? 'border-gray-700 text-gray-400 hover:bg-gray-900'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Eye size={20} />
                  <span className={`text-xs ${isThinText ? 'font-light' : ''}`}>Single</span>
                </button>
              </div>
            </div>

            {/* Text Style */}
            <div>
              <label className={`flex items-center gap-2 text-sm mb-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                <Type size={16} />
                Text Style
              </label>
              <button
                onClick={onToggleThinText}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  isDarkTheme 
                    ? 'border-gray-700 hover:bg-gray-900' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : ''}`}>
                  Thin Text
                </span>
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  isThinText 
                    ? 'bg-blue-600' 
                    : isDarkTheme 
                      ? 'bg-gray-700' 
                      : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                    isThinText ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-0.5`}></div>
                </div>
              </button>
            </div>

            {/* Card Borders */}
            <div>
              <label className={`flex items-center gap-2 text-sm mb-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : 'font-medium'}`}>
                <Grid size={16} />
                Card Borders
              </label>
              <button
                onClick={onToggleCardBorders}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  isDarkTheme 
                    ? 'border-gray-700 hover:bg-gray-900' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isThinText ? 'font-light' : ''}`}>
                  Show Card Borders
                </span>
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  showCardBorders 
                    ? 'bg-blue-600' 
                    : isDarkTheme 
                      ? 'bg-gray-700' 
                      : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                    showCardBorders ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-0.5`}></div>
                </div>
              </button>
            </div>
          </div>
          
          <div className="flex justify-end pt-6">
            <button
              onClick={onClose}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ${isThinText ? 'font-light' : ''}`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};