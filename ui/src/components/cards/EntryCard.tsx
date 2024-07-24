import useDelete from '@/hooks/useDelete';
import { Trash } from 'lucide-react';
import Loader from '@/components/Loader';
import React from 'react';

interface EntryData {
  value: any;
  type: string;
}

interface EntryCardProps {
  collectionId: string;
  entryId: string;
  data: Record<string, EntryData>;
}

const EntryCard: React.FC<EntryCardProps> = ({ collectionId, entryId, data }) => {
  const { isDeleting, error, handleDelete } = useDelete(`/api/entries/${entryId}`, `/collections/${collectionId}`);

  return (
    <div className="card p-4 border rounded-lg shadow-md">
      {isDeleting && <Loader size="md" />}
      {error && <p className="text-red-500">{error}</p>}
      {Object.entries(data).map(([key, { value, type }]) => (
        <div key={key} className="mb-2">
          {type === 'string' && <p><strong>{key}:</strong> {value}</p>}
          {type === 'image' && <img src={value} alt={value} className="w-full h-auto" />}
          {type === 'date' && <p><strong>{key}:</strong> {value}</p>}
          {type === 'number' && <p><strong>{key}:</strong> {value}</p>}
          {type === 'boolean' && <p><strong>{key}:</strong> {value ? 'True' : 'False'}</p>}
          {type === 'url' && <p><strong>{key}:</strong> <a className="link" href={value} target="_blank" rel="noopener noreferrer">See Link</a></p>}
        </div>
      ))}
      <div className="flex justify-end w-full">
        <button onClick={handleDelete} className="ml-2 text-red-500 hover:text-red-700">
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default EntryCard;
