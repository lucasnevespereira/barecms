import CreateEntryModal from "@/components/modals/CreateEntryModal";
import { useFetch } from "@/hooks/useFetch";
import { Collection } from "@/types";
import { useRef } from "react";
import { useParams } from "react-router-dom";

const CollectionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: collection, loading, error } = useFetch<Collection>(`/api/collections/${id}`);
  const entryModalRef = useRef<HTMLDialogElement>(null);
  const openEntryModal = () => {
    if (entryModalRef.current) {
      entryModalRef.current.showModal();
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <main className='py-10 min-h-[600px]'>
      <div className="w-full flex justify-between items-center">
        <h2 className={"text-2xl font-bold"}>{collection?.name || "Collection Details"}</h2>
        <button className="btn btn-error btn-outline" >Delete Collection</button>
      </div>

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
            <CreateEntryModal dialogRef={entryModalRef} collectionId={collection.id} fields={collection.fields} />
          </div>
        </div>
      )}
    </main>
  )
}

export default CollectionDetailsPage;