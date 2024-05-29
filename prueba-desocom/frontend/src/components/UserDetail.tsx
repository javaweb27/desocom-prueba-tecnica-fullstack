import { Link, useParams } from "react-router-dom";
import "./user-details.css";
import { User } from "./types";
import { useEffect, useState } from "react";
import { NODE_API } from "../config";

export default function UserDetail() {
  const [user, setUser] = useState<User | null | undefined>();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(NODE_API + "/users/" + userId);
        const data = (await response.json()) as User;

        const isNotFound = Object.keys(data).length === 0;

        setUser(isNotFound ? null : data);
      } catch (error) {
        console.error("Error al obtener un usuario:", error);
      }
    };

    fetchUsers();
  }, []);

  if (undefined === user) {
    return "Loading";
  }
  if (null === user) {
    return "Usuario no encontrado";
  }

  return (
    <section>
      <h2 className="users-title">User details</h2>
      <div>
        <h3 style={{ fontWeight: "bold" }}>{user.name}</h3>
        <br />
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
        <br />
        <h3>Address:</h3>
        <p>Street: {user.address.street}</p>
        <p>Suite: {user.address.suite}</p>
        <p>City: {user.address.city}</p>
        <p>Zipcode: {user.address.zipcode}</p>
        <br />
        <h3>Company:</h3>
        <p>Name: {user.company.name}</p>
        <p>Catch Phrase: {user.company.catchPhrase}</p>
        <p>BS: {user.company.bs}</p>
      </div>

      <br />
      <Link to={"/"} className="link-back-to-home">
        Volver al inicio
      </Link>
    </section>
  );
}
