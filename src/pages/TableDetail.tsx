import { Button } from "flowbite-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ClientCard } from "../components/ClientCard";
import { AddClientModal } from "../components/AddClientModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Table, Client, Product } from "../types";

export function TableDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tables, setTables] = useLocalStorage<Table[]>("cerveroga-tables", []);
  const [showAddClient, setShowAddClient] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const table = tables.find((t) => t.id === id);

  if (!table) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Mesa no encontrada
          </p>
          <Button
            color="blue"
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Volver a Mesas
          </Button>
        </div>
      </Layout>
    );
  }

  const updateTable = (updatedTable: Table) => {
    setTables(tables.map((t) => (t.id === updatedTable.id ? updatedTable : t)));
  };

  const handleAddClient = (name: string) => {
    const newClient: Client = {
      id: crypto.randomUUID(),
      name,
      products: [],
    };
    updateTable({ ...table, clients: [...table.clients, newClient] });
    setShowAddClient(false);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
  };

  const handleUpdateClient = (name: string) => {
    if (editingClient) {
      updateTable({
        ...table,
        clients: table.clients.map((c) =>
          c.id === editingClient.id ? { ...c, name } : c
        ),
      });
      setEditingClient(null);
    }
  };

  const handleDeleteClient = (clientId: string) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este cliente?")
    ) {
      updateTable({
        ...table,
        clients: table.clients.filter((c) => c.id !== clientId),
      });
    }
  };

  const handleAddProduct = (clientId: string, name: string, quantity: number) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      quantity,
    };
    updateTable({
      ...table,
      clients: table.clients.map((c) =>
        c.id === clientId ? { ...c, products: [...c.products, newProduct] } : c
      ),
    });
  };

  const handleEditProduct = (
    clientId: string,
    productId: string,
    name: string,
    quantity: number
  ) => {
    updateTable({
      ...table,
      clients: table.clients.map((c) =>
        c.id === clientId
          ? {
              ...c,
              products: c.products.map((p) =>
                p.id === productId ? { ...p, name, quantity } : p
              ),
            }
          : c
      ),
    });
  };

  const handleDeleteProduct = (clientId: string, productId: string) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este producto?")
    ) {
      updateTable({
        ...table,
        clients: table.clients.map((c) =>
          c.id === clientId
            ? { ...c, products: c.products.filter((p) => p.id !== productId) }
            : c
        ),
      });
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver a Mesas
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mesa #{table.number}
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {table.clients.length}{" "}
              {table.clients.length === 1 ? "cliente" : "clientes"}
            </p>
          </div>
          <Button color="blue" onClick={() => setShowAddClient(true)}>
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Agregar Cliente
          </Button>
        </div>
      </div>

      {table.clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No hay clientes en esta mesa
          </p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Haz clic en "Agregar Cliente" para comenzar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {table.clients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onEdit={handleEditClient}
              onDelete={handleDeleteClient}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          ))}
        </div>
      )}

      <AddClientModal
        isOpen={showAddClient}
        onClose={() => setShowAddClient(false)}
        onConfirm={handleAddClient}
      />

      {editingClient && (
        <AddClientModal
          isOpen={!!editingClient}
          onClose={() => setEditingClient(null)}
          onConfirm={handleUpdateClient}
          initialValue={editingClient.name}
        />
      )}
    </Layout>
  );
}
