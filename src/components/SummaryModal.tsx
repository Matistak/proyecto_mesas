import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { useState } from "react";
import type { Table } from "../types";

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tables: Table[];
}

export function SummaryModal({ isOpen, onClose, tables }: SummaryModalProps) {
  const [copied, setCopied] = useState(false);

  const totalClients = tables.reduce((sum, t) => sum + t.clients.length, 0);
  const totalProducts = tables.reduce(
    (sum, t) =>
      sum +
      t.clients.reduce(
        (cSum, c) => cSum + c.products.reduce((pSum, p) => pSum + p.quantity, 0),
        0
      ),
    0
  );

  const buildTextSummary = (): string => {
    if (tables.length === 0) return "No hay mesas registradas.";

    let text = `RESUMEN GENERAL - CERVEROGA\n`;
    text += `========================\n\n`;
    text += `Total mesas: ${tables.length}\n`;
    text += `Total clientes: ${totalClients}\n`;
    text += `Total productos: ${totalProducts}\n\n`;

    tables.forEach((table) => {
      text += `MESA #${table.number}\n`;
      text += `${"-".repeat(20)}\n`;

      if (table.clients.length === 0) {
        text += `  Sin clientes\n`;
      } else {
        table.clients.forEach((client) => {
          text += `  ${client.name}\n`;
          if (client.products.length === 0) {
            text += `    - Sin productos\n`;
          } else {
            client.products.forEach((product) => {
              text += `    - ${product.name} x${product.quantity}\n`;
            });
          }
        });
      }
      text += `\n`;
    });

    return text;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildTextSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments where clipboard API is not available
      const textarea = document.createElement("textarea");
      textarea.value = buildTextSummary();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="5xl">
      <ModalHeader>Resumen General</ModalHeader>
      <ModalBody>
        {tables.length === 0 ? (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            No hay mesas registradas
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {tables.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {tables.length === 1 ? "Mesa" : "Mesas"}
                </div>
              </div>
              <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {totalClients}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {totalClients === 1 ? "Cliente" : "Clientes"}
                </div>
              </div>
              <div className="rounded-lg bg-amber-50 p-4 text-center dark:bg-amber-900/20">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {totalProducts}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {totalProducts === 1 ? "Producto" : "Productos"}
                </div>
              </div>
            </div>

            {/* Tables detail */}
            <div className="space-y-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800"
                >
                  <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                    Mesa #{table.number}
                  </h3>

                  {table.clients.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sin clientes
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {table.clients.map((client) => (
                        <div
                          key={client.id}
                          className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
                        >
                          <h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                            {client.name}
                          </h4>
                          {client.products.length === 0 ? (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Sin productos
                            </p>
                          ) : (
                            <ul className="space-y-1">
                              {client.products.map((product) => (
                                <li
                                  key={product.id}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {product.name}
                                  </span>
                                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                    × {product.quantity}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <div className="flex w-full items-center justify-between">
          <Button color="light" onClick={handleCopy}>
            {copied ? (
              <>
                <svg
                  className="mr-2 h-5 w-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copiado
              </>
            ) : (
              <>
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copiar resumen
              </>
            )}
          </Button>
          <Button color="blue" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
