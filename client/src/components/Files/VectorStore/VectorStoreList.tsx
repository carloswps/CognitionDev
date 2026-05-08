import React from 'react';
import type { TVectorStore } from '~/common';
import VectorStoreListItem from './VectorStoreListItem';

type VectorStoreListProps = {
  vectorStores: TVectorStore[];
  deleteVectorStore: (id: string | undefined) => void;
};

export default function VectorStoreList({ vectorStores, deleteVectorStore }: VectorStoreListProps) {
  return (
    <div>
      {vectorStores.map((vectorStore, index) => (
        <VectorStoreListItem
          key={index}
          vectorStore={vectorStore}
          deleteVectorStore={deleteVectorStore}
        />
      ))}
    </div>
  );
}
