import { useEffect, useState } from "react";
import { User } from "./types";
import "./users-component.css";
import { Link } from "react-router-dom";
import { NODE_API } from "../config";

const UsersComponent = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(NODE_API + "/users");
        const data = (await response.json()) as User[];
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section>
      <h2 className="users-title">Usuarios</h2>
      <div className="users">
        {users.map((user) => (
          <div className="users-card" key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <div className="company-container">
              <p>Company:</p>
              <p>{user.company.name}</p>
              <p>{user.company.catchPhrase}</p>
              <p>{user.company.bs}</p>
            </div>
            <Link to={`/${user.id}`} className="btn-details">
              Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UsersComponent;
