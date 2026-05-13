import { Button, Card } from 'flowbite-react';
import { useState } from 'react';
import type { Client } from '../types';
import { AddProductModal } from './AddProductModal';

interface ClientCardProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (clientId: string) => void;
  onAddProduct: (clientId: string, name: string, quantity: number) => void;
  onEditProduct: (clientId: string, productId: string, name: string, quantity: number) => void;
  onDeleteProduct: (clientId: string, productId: string) => void;
}

export function ClientCard({ client, onEdit, onDelete, onAddProduct, onEditProduct, onDeleteProduct }: ClientCardProps) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<{ id: string; name: string; quantity: number } | null>(null);

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{client.name}</h4>
        <div className="flex gap-2">
          <Button
            size="sm"
            color="light"
            onClick={() => onEdit(client)}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
          <Button
            size="sm"
            color="red"
            onClick={() => onDelete(client.id)}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <h5 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Productos:</h5>
        {client.products.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Sin productos</p>
        ) : (
          <ul className="space-y-2">
            {client.products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800"
              >
                <span className="text-sm text-gray-900 dark:text-gray-200">
                  {product.name} <span className="text-gray-500">× {product.quantity}</span>
                </span>
                <div className="flex gap-1">
                  <Button
                    size="xs"
                    color="light"
                    onClick={() => setEditingProduct({ id: product.id, name: product.name, quantity: product.quantity })}
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    onClick={() => onDeleteProduct(client.id, product.id)}
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Button
          size="sm"
          color="blue"
          className="mt-3"
          onClick={() => setShowAddProduct(true)}
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar Producto
        </Button>
      </div>

      <AddProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onConfirm={(name, quantity) => {
          onAddProduct(client.id, name, quantity);
          setShowAddProduct(false);
        }}
      />

      {editingProduct && (
        <AddProductModal
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onConfirm={(name, quantity) => {
            onEditProduct(client.id, editingProduct.id, name, quantity);
            setEditingProduct(null);
          }}
          initialName={editingProduct.name}
          initialQuantity={editingProduct.quantity}
        />
      )}
    </Card>
  );
}
