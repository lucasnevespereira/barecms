import React from 'react';

interface EntryData {
  value: any;
  type: string;
}

interface EntryCardProps {
  data: Record<string, EntryData>;
}

const EntryCard: React.FC<EntryCardProps> = ({ data }) => {
  return (
    <div className="card p-4 border rounded-lg shadow-md">
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
    </div>
  );
};

export default EntryCard;
