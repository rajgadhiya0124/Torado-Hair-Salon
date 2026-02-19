import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi';
import { IoPencil } from 'react-icons/io5';
import { toast } from 'react-toastify';

const AdminTeam = () => {

  const [team, setTeam] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [createData, setCreateData] = useState({
    person_name: "",
    person_role: "",
    person_image: null,
  });

  const [editData, setEditData] = useState({
    id:"",
    person_name: "",
    person_role: "",
    person_image: null,
  });

  const token = localStorage.getItem("token");

  // feth all team
  const fetchTeam = async()=>{
      try {
        const res = await axios.get(`http://localhost:4000/api/team/getAll`);
        setTeam(res.data.data);

      } catch (error) {
        console.error("Error fetching team:", error);
      }
    }

    useEffect(()=>{
      fetchTeam();
    }, []);

    //create
    const handleCreateChange = (e) => {
      setCreateData({
        ...createData,
        [e.target.name]: e.target.value,
      });
    };

    const handleCreateImageChange = (e) => {
      setCreateData({
        ...createData,
        person_image: e.target.files[0],
      });
    };

    const handleCreate = async (e) => {
    e.preventDefault();

      const formData = new FormData();
      formData.append("person_name", createData.person_name);
      formData.append("person_role", createData.person_role);
      formData.append("person_image", createData.person_image);

      try {
        await axios.post( "http://localhost:4000/api/team/create",formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Team member created successfully!");
        setCreateModal(false);
        setCreateData({ person_name: "", person_role: "", person_image: null});
        fetchTeam();
      } catch (error) {
        console.error("Create error:", error);
        toast.error("Failed to create member");
      }
    };


    const openEditModal = (item)=>{
      setEditData({
        id: item.id,
        person_name: item.person_name,
        person_role: item.person_role,
        person_image: null,
      })
      setEditModal(true)
    } 

    const handleEditChange = (e)=>{
      setEditData({
        ...editData,
        [e.target.name]:e.target.value
      })
    }

    const handleImageChange = (e)=>{
      setEditData({
        ...editData,
        person_image: e.target.files[0]
      })
    }

    //update team
    const handleUpdate = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("person_name", editData.person_name);
      formData.append("person_role", editData.person_role);

      if (editData.person_image) {
        formData.append("person_image", editData.person_image);
      }

      try {
        await axios.put(`http://localhost:4000/api/team/update/${editData.id}`,formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Team member updated successfully!");
        setEditModal(false);
        fetchTeam();
      } catch (error) {
        console.error("Update error:", error);
      }
    };

    // Delete Team Member
    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure to delete this member?")) return;

      try {
          const res = await axios.delete(`http://localhost:4000/api/team/delete/${id}`,
            {
              headers:{
                Authorization: `Bearer ${token}`
              }
            }
          );
          toast.success("Team Mneber Deleted");
          fetchTeam();
      } catch (error) {
          console.error("Error deleting team:", error);
      }
    };

  return (
    <>
      <div className='admin-page-title-content'>
        <h2 className='admin-page-title'>Team Members</h2>
      </div>

      <div className="admin-add-btn-wrapper">
        <button
          className="admin-add-btn"
          onClick={() => setCreateModal(true)}
        >
          + Add Member
        </button>
      </div>


      <div className='admin-team-content'>
        <div className="team-list">
            {team.map((item) => (
              <div key={item.id} className="admin-team-card">
                <img
                  src={`http://localhost:4000/uploads/team/${item.person_image}`}
                  alt={item.name}
                  className="team-img"
                />
                
                <h4 className='admin-team-name'>{item.person_name}</h4>
                <p className='admin-team-role'>{item.person_role}</p>

                <div className='team-action-button'>
                  <button
                    className="admin-edit-btn"
                    onClick={() =>openEditModal(item)}
                  >
                    <IoPencil />
                  </button>

                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <BiSolidTrashAlt />
                  </button>
                </div>
              </div>
            ))}
        </div>
    </div>
    
    {/* team edit model and creat modal css same */}
    {createModal && (
      <div className="team-edit-modal-overlay">
        <div className="team-edit-modal">
          <h3 className="edit-model-h3">Create Team Member</h3>

          <form className="team-edit-form" onSubmit={handleCreate}>
            <label>Person Name</label>
            <input
              type="text"
              name="person_name"
              value={createData.person_name}
              onChange={handleCreateChange}
              required
            />

            <label>Person Role</label>
            <input
              type="text"
              name="person_role"
              value={createData.person_role}
              onChange={handleCreateChange}
              required
            />

            <label>Person Image</label>
            <input
              type="file"
              name="person_image"
              onChange={handleCreateImageChange}
              required
            />

            <div className="update-model-action">
              <button type="submit" className="admin-update-btn">
                Create
              </button>

              <button
                type="button"
                className="admin-cancel-btn"
                onClick={() => setCreateModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}


    {/* edit modal */}
    {editModal && (
      <div className="team-edit-modal-overlay">
        <div className="team-edit-modal">
          <h3 className='edit-model-h3'>Update Team Member</h3>

          <form className="team-edit-form" onSubmit={handleUpdate}>

            <label>Person Name</label>
            <input
              type="text"
              name="person_name"
              value={editData.person_name}
              onChange={handleEditChange}
              placeholder="Person Name"
              required
            />

            <label>Person Role</label>
            <input
              type="text"
              name="person_role"
              value={editData.person_role}
              onChange={handleEditChange}
              placeholder="Person Role"
              required
            />
            
            <label>Person Image</label>
            <input
              type="file"
              name="person_image"
              onChange={handleImageChange}
            />

            <div className="update-model-action">
              <button type="submit" className='admin-update-btn'>
                Update
              </button>

              <button
                type="button"
                className="admin-cancel-btn"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  )
}

export default AdminTeam

