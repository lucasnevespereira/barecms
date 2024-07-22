import React, { useState } from "react";

interface CreateSiteModalProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
}

const CreateSiteModal: React.FC<CreateSiteModalProps> = ({ dialogRef }) => {
    const [siteName, setSiteName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSiteName(e.target.value);
        setError(null)
    };

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const onCreateSite = async (siteName: string) => {
        return await fetch('/api/sites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: siteName }),
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (siteName.trim() === '') {
            setError('Site name cannot be empty.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await onCreateSite(siteName);
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            console.log('Site created successfully');
            closeDialog();
            setTimeout(() => {
                window.location.reload();
            }, 300);
        } catch (e: any) {
            console.error(e);
            setError(e.message || 'Failed to create site. Please try again.');
        } finally {
            setLoading(false);
            setSiteName('');
        }
    };

    return (
        <dialog className="modal" ref={dialogRef}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create new site</h3>
                <input
                    type="text"
                    placeholder="Enter site name"
                    className="input input-bordered w-full"
                    value={siteName}
                    onChange={handleSiteNameChange}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="modal-action">
                    <button disabled={loading} onClick={handleSubmit} className="btn btn-primary">
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                    <button className="btn" onClick={closeDialog} >Cancel</button>
                </div>
            </div>
        </dialog>
    )
};

export default CreateSiteModal;
