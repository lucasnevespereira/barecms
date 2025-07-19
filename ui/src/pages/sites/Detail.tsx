import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import CreateCollectionModal from "@/components/modals/CreateCollectionModal";
import { useSiteDetail } from "@/hooks/useSiteDetail";
import Loader from "@/components/Loader";
import useDelete from "@/hooks/useDelete";
import ViewSiteDataModal from "@/components/modals/ViewSiteDataModal";

const SiteDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { site, collections, loading, error } = useSiteDetail(id);
  const { isDeleting, handleDelete } = useDelete(`/sites/${id || ""}`, "/");

  const collectionModalRef = useRef<HTMLDialogElement>(null);
  const viewDataModalRef = useRef<HTMLDialogElement>(null);

  const openCollectionModal = () => {
    if (collectionModalRef.current) {
      collectionModalRef.current.showModal();
    }
  };

  const openDataModal = () => {
    if (viewDataModalRef.current) {
      viewDataModalRef.current.showModal();
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
        <a href="/" className="btn btn-primary mt-4">
          Back to Sites
        </a>
      </main>
    );
  }

  if (!site) {
    return (
      <main className="py-10 min-h-[600px]">
        <div className="alert alert-warning">Site not found</div>
        <a href="/" className="btn btn-primary mt-4">
          Back to Sites
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
              <a href={`/sites/${id}`}>{site.name}</a>
            </li>
          </ul>
        </div>
        <div className="actions flex items-center gap-2">
          <button className="btn btn-sm btn-primary" onClick={openDataModal}>
            View Site Data
          </button>
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
                  {isDeleting ? "Deleting..." : "Delete Site"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-2">{site.name}</h2>
        <p className="text-gray-600 mb-4">Id: {site.id}</p>
        <p className="text-gray-600 mb-4">Slug: {site.slug}</p>
        <hr />

        <div className="collections-container flex flex-col gap-5">
          <div className="w-full flex justify-between items-center mt-6">
            <h3 className="text-xl font-semibold">Collections</h3>
            <button className="btn" onClick={openCollectionModal}>
              + New Collection
            </button>
          </div>

          {collections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="card w-full mx-auto border border-gray-200 p-5 mt-3 rounded cursor-pointer"
                >
                  <h3 className="card-title font-bold">{collection.name}</h3>
                  <p className="text-sm">{collection.slug}</p>
                  <a
                    className="link flex justify-end"
                    href={`/sites/${site.id}/collections/${collection.id}`}
                  >
                    view
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3">No collections found</p>
          )}
        </div>

        <CreateCollectionModal
          dialogRef={collectionModalRef}
          siteId={site.id}
        />
        <ViewSiteDataModal dialogRef={viewDataModalRef} siteSlug={site.slug} />
      </div>
    </main>
  );
};

export default SiteDetailsPage;
