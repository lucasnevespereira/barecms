import React, { useState } from "react";

interface Field {
  name: string;
  type: string;
}

interface CreateCollectionModalProps {
  siteId: string;
  dialogRef: React.RefObject<HTMLDialogElement>;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({ siteId, dialogRef }) => {
  const [collectionName, setCollectionName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("string");
  const [error, setError] = useState<string | null>(null);
  const [fieldsError, setFieldsError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCollectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionName(e.target.value);
    setError(null);
  };

  const handleNewFieldNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFieldName(e.target.value);
  };

  const handleNewFieldTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewFieldType(e.target.value);
  };

  const addField = () => {
    if (newFieldName.trim() === "") {
      setError("Field name cannot be empty.");
      return;
    }

    setFields([...fields, { name: newFieldName, type: newFieldType }]);
    setNewFieldName("");
    setNewFieldType("string");
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const onAddCollection = async (name: string, fields: Field[]) => {
    console.log("Creating collection", name, fields, siteId);
    const payload = JSON.stringify({ name, fields, siteId });
    return await fetch(`/api/collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (collectionName.trim() === "") {
      setError("Collection name cannot be empty.");
      return;
    }

    if (fields.length === 0) {
      setFieldsError("You must add at least one field to the collection.");
      return;
    }
    setLoading(true);
    setError(null);
    setFieldsError(null);
    try {
      const response = await onAddCollection(collectionName, fields);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      closeDialog();
      window.location.reload();
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to create collection. Please try again.");
    } finally {
      setLoading(false);
      setCollectionName("");
      setFields([]);
    }
  };

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Create new collection</h3>
        <input
          type="text"
          placeholder="Enter collection name"
          className="input input-bordered w-full"
          value={collectionName}
          onChange={handleCollectionNameChange}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Fields</h4>
          {fields.map((field, index) => (
            <div key={index} className="flex items-center mb-2">
              <p className="mr-2">{field.name} ({field.type})</p>
              <button className="btn btn-sm btn-error btn-outline" onClick={() => removeField(index)}>Remove</button>
            </div>
          ))}
          <div className="flex mb-2">
            <input
              type="text"
              placeholder="Field name"
              className="input input-bordered w-full mr-2"
              value={newFieldName}
              onChange={handleNewFieldNameChange}
            />
            <select className="select select-bordered" value={newFieldType} onChange={handleNewFieldTypeChange}>
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="date">Date</option>
              <option value="image">Image</option>
              <option value="url">URL</option>
            </select>
            <button className="btn btn-primary ml-2" onClick={addField}>Add Field</button>
          </div>
        </div>
        {fieldsError && <p className="text-red-500 mt-2">{fieldsError}</p>}
        <div className="modal-action">
          <button disabled={loading} onClick={handleSubmit} className="btn btn-primary">
            {loading ? "Creating..." : "Create"}
          </button>
          <button className="btn" onClick={closeDialog}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
};

export default CreateCollectionModal;
