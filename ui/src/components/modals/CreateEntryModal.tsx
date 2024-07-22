import { Field } from "@/types";
import { useEffect, useState } from "react";

interface CreateEntryModalProps {
  collectionId: string;
  fields: Field[];
  dialogRef: React.RefObject<HTMLDialogElement>;
}

const CreateEntryModal: React.FC<CreateEntryModalProps> = ({ collectionId, fields, dialogRef }) => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  useEffect(() => {
    // Initialize form state with empty values for each field
    const initialFormState: Record<string, any> = {};
    fields.forEach(field => {
      initialFormState[field.name] = '';
    });
    setFormState(initialFormState);
  }, [fields]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };
  const onAddEntry = async (collectionId: string, entry: Record<string, any>) => {
    console.log("Creating entry", entry, collectionId);
    const payload = JSON.stringify({ collectionId, data: entry });
    console.log("payload", payload);
    return await fetch(`/api/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });
  }
  const handleSubmit = async () => {
    const hasEmptyFields = fields.some(field => formState[field.name].trim() === '');

    if (hasEmptyFields) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await onAddEntry(collectionId, formState);
      setTimeout(() => {
        closeDialog();
        window.location.reload();
      }, 3000)
    } catch (e: any) {
      console.error(e);
      setError("Failed to create entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Create new entry</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mt-4">
          {fields.map(field => (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={field.name}>
                {field.name} ({field.type})
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formState[field.name]}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          ))}
        </div>
        <div className="modal-action">
          <button disabled={loading} onClick={handleSubmit} className="btn btn-primary">
            {loading ? "Creating..." : "Create"}
          </button>
          <button className="btn" onClick={closeDialog}>Cancel</button>
        </div>
      </div>
    </dialog>
  )
}
export default CreateEntryModal;