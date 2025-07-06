import React, { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';
import { LinkCard } from './components/LinkCard';
import { LinkForm } from './components/LinkForm';
import { ToolsBar } from './components/ToolsBar';
import { SettingsModal } from './components/SettingsModal';
import { InfoModal } from './components/InfoModal';
import { SiteLink } from './types';

function App() {
  const [links, setLinks] = useState<SiteLink[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedLink, setSelectedLink] = useState<SiteLink | undefined>();
  const [editingLink, setEditingLink] = useState<SiteLink | undefined>();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isThinText, setIsThinText] = useState(false);
  const [showCardBorders, setShowCardBorders] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'card' | 'single'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const sampleLinks: SiteLink[] = [
      {
        id: '1',
        title: 'Portfolio Website',
        url: 'https://example.com/portfolio',
        description: 'My personal portfolio showcasing web development projects and skills.',
        category: 'Portfolio',
        tags: ['React', 'TypeScript', 'Design'],
        createdAt: new Date('2024-01-15'),
        isActive: true,
        status: 'online',
        lastChecked: new Date(),
        responseTime: 245
      },
      {
        id: '2',
        title: 'E-commerce Store',
        url: 'https://example.com/store',
        description: 'Modern e-commerce platform with advanced features.',
        category: 'E-commerce',
        tags: ['Next.js', 'Stripe', 'Commerce'],
        createdAt: new Date('2024-01-10'),
        isActive: true,
        status: 'maintenance',
        lastChecked: new Date(),
        responseTime: 1200
      },
      {
        id: '3',
        title: 'Tech Blog',
        url: 'https://example.com/blog',
        description: 'Writing about web development trends and tutorials.',
        category: 'Blog',
        tags: ['Content', 'Tech', 'Writing'],
        createdAt: new Date('2024-01-05'),
        isActive: false,
        status: 'offline',
        lastChecked: new Date(),
        responseTime: undefined
      },
      {
        id: '4',
        title: 'Business Website',
        url: 'https://example.com/business',
        description: 'Professional business website with modern design.',
        category: 'Business',
        tags: ['Business', 'Professional', 'Corporate'],
        createdAt: new Date('2024-01-01'),
        isActive: true,
        status: 'online',
        lastChecked: new Date(),
        responseTime: 180
      }
    ];
    setLinks(sampleLinks);
  }, []);

  const handleAddLink = (linkData: Omit<SiteLink, 'id' | 'createdAt'>) => {
    const newLink: SiteLink = {
      ...linkData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setLinks(prev => [newLink, ...prev]);
    setShowForm(false);
  };

  const handleEditLink = (linkData: Omit<SiteLink, 'id' | 'createdAt'>) => {
    if (editingLink) {
      setLinks(prev => prev.map(link =>
        link.id === editingLink.id
          ? { ...linkData, id: editingLink.id, createdAt: editingLink.createdAt }
          : link
      ));
      setEditingLink(undefined);
      setShowForm(false);
    }
  };

  const handleDeleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setLinks(prev => prev.map(link =>
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  const handleCheckStatus = (id: string) => {
    const statuses: ('online' | 'offline' | 'maintenance')[] = ['online', 'offline', 'maintenance'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomResponseTime = randomStatus === 'online' ? Math.floor(Math.random() * 2000) + 100 : undefined;
    
    setLinks(prev => prev.map(link =>
      link.id === id 
        ? { 
            ...link, 
            status: randomStatus, 
            lastChecked: new Date(),
            responseTime: randomResponseTime
          } 
        : link
    ));
  };

  const handleCheckAll = () => {
    links.forEach(link => handleCheckStatus(link.id));
  };

  const handleQrCode = () => {
    alert('QR Code generator coming soon!');
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const openEditForm = (link: SiteLink) => {
    setEditingLink(link);
    setShowForm(true);
  };

  const openAddForm = () => {
    setEditingLink(undefined);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingLink(undefined);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const openInfo = (link: SiteLink) => {
    setSelectedLink(link);
    setShowInfo(true);
  };

  const closeInfo = () => {
    setShowInfo(false);
    setSelectedLink(undefined);
  };

  // Filter links based on search and filters
  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !filterCategory || link.category === filterCategory;
    const matchesStatus = !filterStatus || link.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(links.map(link => link.category))];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkTheme ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="w-full px-2 lg:px-4 py-3">
        <ToolsBar
          onAddNew={openAddForm}
          onCheckAll={handleCheckAll}
          onSettings={openSettings}
          onQrCode={handleQrCode}
          onToggleTheme={toggleTheme}
          isDarkTheme={isDarkTheme}
          isThinText={isThinText}
        />

        {filteredLinks.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 ${isDarkTheme ? 'bg-gray-900' : 'bg-blue-100'}`}>
              <QrCode className={`${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} size={24} />
            </div>
            <h3 className={`text-xl mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'} ${isThinText ? 'font-light' : 'font-medium'}`}>
              {searchTerm || filterCategory || filterStatus ? 'No matching sites found' : 'No sites added yet'}
            </h3>
            <p className={`mb-6 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${isThinText ? 'font-light' : ''}`}>
              {searchTerm || filterCategory || filterStatus ? 'Try adjusting your filters in settings' : 'Get started by adding your first website'}
            </p>
            {!searchTerm && !filterCategory && !filterStatus && (
              <button
                onClick={openAddForm}
                className={`px-6 py-3 rounded-lg transition-colors ${isDarkTheme ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} ${isThinText ? 'font-light' : ''}`}
              >
                Add Your First Site
              </button>
            )}
          </div>
        ) : (
          <div className={`${viewMode === 'card' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3' : 'space-y-2'}`}>
            {filteredLinks.slice(0, viewMode === 'single' ? 1 : undefined).map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={openEditForm}
                onDelete={handleDeleteLink}
                onToggleActive={handleToggleActive}
                onCheckStatus={handleCheckStatus}
                onInfo={openInfo}
                isDarkTheme={isDarkTheme}
                isThinText={isThinText}
                showCardBorders={showCardBorders}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        <LinkForm
          link={editingLink}
          onSubmit={editingLink ? handleEditLink : handleAddLink}
          onCancel={closeForm}
          isOpen={showForm}
          isDarkTheme={isDarkTheme}
          isThinText={isThinText}
        />

        <SettingsModal
          isOpen={showSettings}
          onClose={closeSettings}
          isDarkTheme={isDarkTheme}
          isThinText={isThinText}
          onToggleThinText={() => setIsThinText(!isThinText)}
          showCardBorders={showCardBorders}
          onToggleCardBorders={() => setShowCardBorders(!showCardBorders)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCategory={filterCategory}
          onCategoryChange={setFilterCategory}
          filterStatus={filterStatus}
          onStatusChange={setFilterStatus}
          categories={categories}
          totalSites={links.length}
        />

        <InfoModal
          isOpen={showInfo}
          onClose={closeInfo}
          link={selectedLink}
          isDarkTheme={isDarkTheme}
          isThinText={isThinText}
        />
      </div>
    </div>
  );
}

export default App;