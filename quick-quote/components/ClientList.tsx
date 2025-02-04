"use client"

import React from 'react';
import styles from './ClientList.module.css';
import Link from "next/link";

interface Client {
  _id: string;
  name: string;
  email: string;
}

const ClientList = (({ clients, isLoading }: { clients: Client[], isLoading: boolean }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Clients</h2>
      {isLoading ? (
        <p>Loading...</p> // Alternatively, use a skeleton loader component here
      ) : clients.length === 0 ? (
        <p>No clients yet.</p>
      ) : (
        <ul className={styles.list}>
          {clients.map((client) => (
            <li key={client._id} className={styles.listItem}>
              <Link href={`/client/${client._id}`} className={styles.link}>
                <span className={styles.clientName}>{client.name}</span>
                <span className={styles.clientEmail}>{client.email}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
});

export default ClientList;