import { Button, Modal, ModalHeader, ModalBody, ModalFooter, TextInput, Label } from 'flowbite-react';
import { useState } from 'react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, quantity: number) => void;
  initialName?: string;
  initialQuantity?: number;
}

export function AddProductModal({ isOpen, onClose, onConfirm, initialName = '', initialQuantity = 1 }: AddProductModalProps) {
  const [name, setName] = useState(initialName);
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && quantity > 0) {
      onConfirm(name.trim(), quantity);
      if (!initialName) {
        setName('');
        setQuantity(1);
      }
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <ModalHeader>{initialName ? 'Editar' : 'Agregar'} Producto</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="productName">Nombre del Producto</Label>
              <TextInput
                id="productName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Cerveza IPA"
                required
              />
            </div>
            <div>
              <Label htmlFor="productQuantity">Cantidad</Label>
              <TextInput
                id="productQuantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                required
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="blue">
            {initialName ? 'Guardar Cambios' : 'Agregar Producto'}
          </Button>
          <Button color="gray" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
