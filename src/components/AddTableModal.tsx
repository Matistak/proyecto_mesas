import { Button, Modal, ModalHeader, ModalBody, ModalFooter, TextInput, Label } from 'flowbite-react';
import { useState } from 'react';

interface AddTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (tableNumber: number) => void;
  nextTableNumber: number;
}

export function AddTableModal({ isOpen, onClose, onConfirm, nextTableNumber }: AddTableModalProps) {
  const [tableNumber, setTableNumber] = useState(nextTableNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tableNumber > 0) {
      onConfirm(tableNumber);
      setTableNumber(nextTableNumber);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <ModalHeader>Agregar Mesa</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tableNumber">Número de Mesa</Label>
              <TextInput
                id="tableNumber"
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(Number(e.target.value))}
                min={1}
                required
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Número sugerido: {nextTableNumber}
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="blue">
            Agregar Mesa
          </Button>
          <Button color="gray" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
