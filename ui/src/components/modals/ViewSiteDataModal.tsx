import React from "react";
import Loader from "../Loader";
import { useFetch } from "@/hooks/useFetch";
import { SiteData } from "@/types";
import { Clipboard } from "lucide-react";

interface ViewSiteDataModalProps {
  siteSlug: string;
  dialogRef: React.RefObject<HTMLDialogElement>;
}

const ViewSiteDataModal: React.FC<ViewSiteDataModalProps> = ({ siteSlug, dialogRef }) => {
  const { data, loading, error } = useFetch<SiteData>(`/api/${siteSlug}/data`);
  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const copyToClipboard = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2))
        .then()
        .catch(err => alert("Failed to copy JSON data: " + err));
    }
  };

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box">
        {loading && <Loader size="lg" />}
        {error && <div className="alert alert-error">{error}</div>}
        {data && (
          <div>
            <div className="modal-title w-full flex justify-between items-center">
              <h3 className="font-bold text-lg">Site Data</h3>
              <Clipboard className="cursor-pointer" onClick={copyToClipboard} />
            </div>
            <div className="overflow-auto max-h-[600px] mt-2">
              <pre className="pretty-json"><code>{JSON.stringify(data, null, 2)}</code></pre>
            </div>
          </div>
        )}
        <form method="dialog" className="modal-backdrop flex justify-end w-full mt-2">
          <button className="btn" onClick={closeDialog}>Close</button>
        </form>
      </div>
    </dialog >
  )
};

export default ViewSiteDataModal;
