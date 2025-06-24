import { useState, useCallback } from 'react';

interface UseModalResult {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export function useModal(initialState = false): UseModalResult {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return { isModalOpen, openModal, closeModal };
}
