import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { DiaryLayout } from './components/DiaryLayout';
import { CreateEntry } from './components/CreateEntry';
import { EntriesFeed } from './components/EntriesFeed';

function App() {
  const { user, loading } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEntryCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <DiaryLayout>
      <CreateEntry onEntryCreated={handleEntryCreated} />
      <EntriesFeed refresh={refreshKey} />
    </DiaryLayout>
  );
}

export default App;
