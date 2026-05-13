import { Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { TableCard } from "../components/TableCard";
import { AddTableModal } from "../components/AddTableModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Table } from "../types";

export function TablesList() {
  const [tables, setTables] = useLocalStorage<Table[]>("cerveroga-tables", []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const navigate = useNavigate();

  const nextTableNumber =
    tables.length > 0 ? Math.max(...tables.map((t) => t.number)) + 1 : 1;

  const handleAddTable = (number: number) => {
    const newTable: Table = {
      id: crypto.randomUUID(),
      number,
      clients: [],
    };
    setTables([...tables, newTable]);
    setShowAddModal(false);
  };

  const handleEditTable = (table: Table) => {
    setEditingTable(table);
  };

  const handleUpdateTable = (number: number) => {
    if (editingTable) {
      setTables(
        tables.map((t) => (t.id === editingTable.id ? { ...t, number } : t))
      );
      setEditingTable(null);
    }
  };

  const handleDeleteTable = (tableId: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta mesa?")) {
      setTables(tables.filter((t) => t.id !== tableId));
    }
  };

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mesas
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Gestiona las mesas de Cerveroga
          </p>
        </div>
        <div className="flex gap-2">
          <Button color="red" onClick={() => {
            if (window.confirm('¿Estás seguro de que deseas borrar TODAS las mesas, clientes y productos? Esta acción no se puede deshacer.')) {
              setTables([]);
            }
          }}>
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Borrar Todo
          </Button>
          <Button color="blue" onClick={() => setShowAddModal(true)}>
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
            Agregar Mesa
          </Button>
        </div>
      </div>

      {tables.length === 0 ? (
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No hay mesas registradas
          </p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            Haz clic en "Agregar Mesa" para comenzar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tables.map((table) => (
            <div
              key={table.id}
              onClick={() => navigate(`/mesa/${table.id}`)}
              className="cursor-pointer"
            >
              <TableCard
                table={table}
                onEdit={handleEditTable}
                onDelete={handleDeleteTable}
              />
            </div>
          ))}
        </div>
      )}

      <AddTableModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onConfirm={handleAddTable}
        nextTableNumber={nextTableNumber}
      />

      {editingTable && (
        <AddTableModal
          isOpen={!!editingTable}
          onClose={() => setEditingTable(null)}
          onConfirm={handleUpdateTable}
          nextTableNumber={editingTable.number}
        />
      )}
    </Layout>
  );
}
