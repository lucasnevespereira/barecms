import React from "react";
import Loader from "@/components/Loader";
import { useUser } from "@/hooks/useUser";
import useDeleteUser from "@/hooks/useDeleteUser";

const Profile: React.FC = () => {
  const { user, loading, error } = useUser();
  const {
    isDeleting,
    error: deleteError,
    handleDelete,
  } = useDeleteUser(user?.id as string);

  if (loading || isDeleting) {
    return <Loader size="lg" />;
  }
  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="flex flex-col py-10 items-center">
      <div className="card w-96">
        <div className="card-body">
          <h2 className="card-title">Profile</h2>
          {user ? (
            <>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
            </>
          ) : (
            <p>No user data</p>
          )}
        </div>
      </div>
      <div className="card w-96 mt-5">
        <div className="card-body">
          {deleteError && (
            <div className="alert alert-error">{deleteError}</div>
          )}
          <button onClick={handleDelete} className="btn btn-outline btn-error">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
