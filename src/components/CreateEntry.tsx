import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Send } from 'lucide-react';

type CreateEntryProps = {
  onEntryCreated: () => void;
};

export function CreateEntry({ onEntryCreated }: CreateEntryProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    const { error: insertError } = await supabase
      .from('diary_entries')
      .insert({
        user_id: user!.id,
        content: content.trim(),
      });

    if (insertError) {
      setError(insertError.message);
    } else {
      setContent('');
      onEntryCreated();
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind today?"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none text-gray-900"
        />

        {error && (
          <div className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">
            {content.length} characters
          </span>

          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{loading ? 'Posting...' : 'Post Entry'}</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
