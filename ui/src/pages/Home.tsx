import React, { useRef } from "react";
import { Site } from "@/types";
import CreateSiteModal from "@/components/modals/CreateSiteModal.tsx";
import { useFetch } from "@/hooks/useFetch";
import { useUser } from "@/hooks/useUser";
import Loader from "@/components/Loader";

type SitesData = {
    sites: Site[]
}

const HomePage: React.FC = () => {
    const { user, loading } = useUser();
    const { data } = useFetch<SitesData>('/api/sites');
    const modalRef = useRef<HTMLDialogElement>(null);
    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    return (
        <div className='py-10 min-h-[600px]'>
            {loading && <div className="p-20"><Loader size="lg" /></div>}
            {user && <div>
                <div className="w-full flex justify-between items-center">
                    <div className="breadcrumbs text-lg">
                        <ul>
                            <li><a href="/">My Sites</a></li>
                        </ul>
                    </div>
                    <button className="btn btn-primary" onClick={openModal}>+ New Site</button>
                </div>
                {data && data.sites.length === 0 && <p className={"mt-3"}>You don't have any sites yet</p>}
                <div className={"sites-container p-2 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto"}>
                    {data && data.sites.length > 0 && data.sites.map(site => (
                        <div key={site.id}
                            className="card w-full mx-auto border border-gray-200 p-5 mt-3 rounded cursor-pointer">
                            <h3 className="card-title font-bold">{site.name}</h3>
                            <p className={"text-sm"}>{site.slug}</p>
                            <a className={"link flex justify-end"} href={`/sites/${site.id}`}>configure</a>
                        </div>
                    ))}
                </div>
                <CreateSiteModal userId={user.id} dialogRef={modalRef} />
            </div>}
        </div >
    );
}

export default HomePage;