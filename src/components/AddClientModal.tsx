import { Button, Modal, ModalHeader, ModalBody, ModalFooter, TextInput, Label } from 'flowbite-react';
import { useState } from 'react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  initialValue?: string;
}

export function AddClientModal({ isOpen, onClose, onConfirm, initialValue = '' }: AddClientModalProps) {
  const [name, setName] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name.trim());
      setName('');
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <ModalHeader>{initialValue ? 'Editar' : 'Agregar'} Cliente</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="clientName">Nombre del Cliente</Label>
              <TextInput
                id="clientName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="blue">
            {initialValue ? 'Guardar Cambios' : 'Agregar Cliente'}
          </Button>
          <Button color="gray" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
