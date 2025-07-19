import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import EntryCard from "@/components/cards/EntryCard";
import Loader from "@/components/Loader";
import CreateEntryModal from "@/components/modals/CreateEntryModal";
import { useCollectionDetail } from "@/hooks/useCollectionDetail";
import useDelete from "@/hooks/useDelete";

const CollectionDetailsPage: React.FC = () => {
  const { id, siteId } = useParams<{ id: string; siteId: string }>();
  const { collection, entries, site, loading, error } = useCollectionDetail(
    id,
    siteId,
  );
  const { isDeleting, handleDelete } = useDelete(
    `/collections/${id || ""}`,
    `/sites/${siteId || ""}`,
  );

  const entryModalRef = useRef<HTMLDialogElement>(null);

  const openEntryModal = () => {
    if (entryModalRef.current) {
      entryModalRef.current.showModal();
    }
  };

  if (loading) {
    return (
      <main className="py-10 min-h-[600px] flex items-center justify-center">
        <Loader size="lg" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-10 min-h-[600px]">
        <div className="alert alert-error">{error}</div>
        <a href={`/sites/${siteId}`} className="btn btn-primary mt-4">
          Back to Site
        </a>
      </main>
    );
  }

  if (!collection) {
    return (
      <main className="py-10 min-h-[600px]">
        <div className="alert alert-warning">Collection not found</div>
        <a href={`/sites/${siteId}`} className="btn btn-primary mt-4">
          Back to Site
        </a>
      </main>
    );
  }

  return (
    <main className="py-10 min-h-[600px]">
      <div className="w-full flex justify-between items-center">
        <div className="breadcrumbs text-lg">
          <ul>
            <li>
              <a href="/">My Sites</a>
            </li>
            <li>
              <a href={`/sites/${siteId}`}>{site?.name || "Site"}</a>
            </li>
            <li>
              <a href={`/sites/${siteId}/collections/${id}`}>
                {collection.name}
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-sm btn-outline">
            Settings
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 w-40 shadow"
          >
            <li className="text-sm">
              <span onClick={handleDelete}>
                {isDeleting ? "Deleting..." : "Delete Collection"}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-2">{collection.name}</h2>
        <p className="text-gray-600 mb-4">Id: {collection.id}</p>
        <p className="text-gray-600 mb-4">Slug: {collection.slug}</p>

        {collection.fields.length > 0 && (
          <div className="collections-container flex flex-col gap-2">
            <div className="w-full flex justify-between items-center mt-6">
              <h3 className="text-xl font-semibold">Fields</h3>
            </div>
            <div className="flex gap-2 overflow-x-auto mb-3">
              {collection.fields.map((field) => (
                <div
                  key={field.name}
                  className="card w-full mx-auto border border-gray-200 p-2 rounded"
                >
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
            <button className="btn btn-dark" onClick={openEntryModal}>
              + New Entry
            </button>
          </div>

          {entries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {entries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  siteId={siteId as string}
                  collectionId={collection.id}
                  entryId={entry.id}
                  data={entry.data}
                />
              ))}
            </div>
          ) : (
            <p className="mt-3">No entries found</p>
          )}

          <CreateEntryModal
            dialogRef={entryModalRef}
            collectionId={collection.id}
            fields={collection.fields}
          />
        </div>
      </div>
    </main>
  );
};

export default CollectionDetailsPage;
