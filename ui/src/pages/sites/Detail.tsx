import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import CreateCollectionModal from "@/components/modals/CreateCollectionModal";
import { useGetSite } from "@/hooks/useGetSite";
import { useGetCollections } from "@/hooks/useGetCollections";



const SiteDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { site, loading, error } = useGetSite(`/api/sites/${id}`);
    const { collections } = useGetCollections(`/api/sites/${id}/collections`);
    const collectionModalRef = useRef<HTMLDialogElement>(null);
    const openCollectionModal = () => {
        if (collectionModalRef.current) {
            collectionModalRef.current.showModal();
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <main className='py-10 min-h-[600px]'>
            <div className="w-full flex justify-between items-center">
                <h2 className={"text-xl font-bold"}>Site Details</h2>
                <button className="btn btn-outline" >Remove Site</button>
            </div>
            {site ? (
                <div className="w-full">
                    <h2 className="text-2xl font-semibold mb-2">{site.name}</h2>
                    <p className="text-gray-600 mb-4">Id: {site.id}</p>
                    <p className="text-gray-600 mb-4">Slug: {site.slug}</p>
                    <hr />
                    <div className="collections-container flex flex-col gap-5">
                        <div className="w-full flex justify-between items-center mt-6">
                            <h3 className="text-xl font-semibold">Collections</h3>
                            <button className="btn btn-dark" onClick={openCollectionModal}>+ New Collection</button>
                        </div>
                        {collections && collections.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                {collections.map((collection) => (
                                    <div key={collection.id} className="card w-full mx-auto border border-gray-200 p-5 mt-3 rounded cursor-pointer">
                                        <h3 className="card-title font-bold">{collection.name}</h3>
                                        <p className="text-sm">{collection.slug}</p>
                                        <a className="link flex justify-end" href={`/collections/${collection.id}`}>view</a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-3">No collections found</p>
                        )}
                        <CreateCollectionModal dialogRef={collectionModalRef} siteId={site.id} />
                    </div>
                </div>
            ) : (
                <p>No site found</p>
            )}
        </main>
    );
}

export default SiteDetailsPage;
