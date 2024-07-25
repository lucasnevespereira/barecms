import EntryCard from "@/components/cards/EntryCard";
import Loader from "@/components/Loader";
import CreateEntryModal from "@/components/modals/CreateEntryModal";
import useDelete from "@/hooks/useDelete";
import { useFetch } from "@/hooks/useFetch";
import { useGetSite } from "@/hooks/useGetSite";
import { Collection, Entry } from "@/types";
import { useRef } from "react";
import { useParams } from "react-router-dom";

const CollectionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { siteId } = useParams<{ siteId: string }>();
  const { data: collection, loading } = useFetch<Collection>(`/api/collections/${id}`);
  const { data: entries, loading: entriesLoading, error: entriesError } = useFetch<Entry[]>(`/api/collections/${id}/entries`);
  const { site } = useGetSite(`/api/sites/${siteId}`);
  const { isDeleting, handleDelete } = useDelete(`/api/collections/${id}`, `/sites/${siteId}`);
  const entryModalRef = useRef<HTMLDialogElement>(null);
  const openEntryModal = () => {
    if (entryModalRef.current) {
      entryModalRef.current.showModal();
    }
  };

  return (
    <main className='py-10 min-h-[600px]'>
      <div className="w-full flex justify-between items-center">
        <div className="breadcrumbs text-lg">
          <ul>
            <li><a>My Sites</a></li>
            <li><a href={`/sites/${siteId}`}>{site?.name || 'Site'}</a></li>
            <li><a href={`/sites/${siteId}/collections/${id}`}>{collection?.name}</a></li>
          </ul>
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-sm btn-outline">Settings</div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 w-40 shadow">
            <li className="text-sm">
              <span onClick={handleDelete}>Delete Collection</span>
            </li>
          </ul>
        </div>
      </div>

      {loading || isDeleting && <Loader size="lg" />}
      {collection && (
        <div className="w-full">
          <p className="text-gray-600 mb-4">Id: {collection.id}</p>
          <p className="text-gray-600 mb-4">Slug: {collection.slug}</p>
          {collection.fields.length > 0 && (
            <div className="collections-container flex flex-col gap-2">
              <div className="w-full flex justify-between items-center mt-6">
                <h3 className="text-xl font-semibold">Fields</h3>
              </div>
              <div className="flex gap-2 overflow-x-auto mb-3">
                {collection.fields.map((field) => (
                  <div key={field.name} className="card w-full mx-auto border border-gray-200 p-2 rounded">
                    <h3 className="text-lg font-bold">{field.name}</h3>
                    <p className="text-sm">{field.type}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <hr />
          <div className="entries-container flex flex-col gap-5">
            <div className="w-full flex justify-between items-center mt-6">
              <h3 className="text-xl font-semibold">Entries</h3>
              <button className="btn btn-dark" onClick={openEntryModal}>+ New Entry</button>
            </div>
            {entriesLoading && <p>Loading entries...</p>}
            {entriesError && <p className="text-red-500">{entriesError}</p>}
            {entries && entries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {entries.map((entry) => (
                  <EntryCard siteId={siteId as string} collectionId={collection.id} entryId={entry.id} data={entry.data} />
                ))}
              </div>
            ) : (
              <p className="mt-3">No entries found</p>
            )}

            <CreateEntryModal dialogRef={entryModalRef} collectionId={collection.id} fields={collection.fields} />
          </div>
        </div>
      )}
    </main>
  )
}

export default CollectionDetailsPage;