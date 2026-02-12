import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidTrashAlt } from "react-icons/bi";

const AdminUserList = () => {

    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token")
    // Fetch Users
    const fetchUsers = async () => {
        try {
            const res = await axios.get( "http://localhost:4000/api/user/admingetall");
            setUsers(res.data.data);
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Delete user
  const deleteUser = async (id) => {
    if(!window.confirm("Are you sure you want to delete this user?")) return ;

    try {
        await axios.delete(`http://localhost:4000/api/user/delete/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        fetchUsers();
    } catch (error) {
        console.error("Delete user error:", error);
        alert("Failed to delete user");
    }
  };
  return (
    <>  
    <div className='admin-page-title-content'>
        <h2 className='admin-page-title'>User Managment</h2>
    </div>

    <div className='admin-page-container'>
        <div className="table-responsive">
          <table className="admin-user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>   
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id || index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role || "-"}</td>
                    <td>
                      <span className={`admin-badge ${user.status === 1 ? 'bg-success' : 'bg-danger'}`}>
                          {user.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                        <BiSolidTrashAlt  
                            className='admin-delete-btn'
                            onClick={()=>deleteUser(user.id)}
                        />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
    </div>
   
    </>
  )
}

export default AdminUserList
