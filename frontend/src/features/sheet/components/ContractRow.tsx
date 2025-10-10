// src/features/sheet/contracts/ContractRow.tsx

import React from 'react';
import { Text, Group, Paper, Button } from '@mantine/core';
import type { ContractItem } from '../../../shared/types/contracType';

// 1. Props aggiornate per la nuova funzionalità
export interface ContractRowProps {
    contract: ContractItem;
    onDetailsClick: () => void;
}

// 2. Componente ContractRow semplificato
export const ContractRow: React.FC<ContractRowProps> = ({ contract, onDetailsClick }) => {
    return (
        <Paper withBorder p="sm" shadow="xs">
            <Group justify="space-between" align="center">
                <Text fw={500}>{contract.name}</Text>
                <Button
                    variant="outline"
                    size="xs"
                    onClick={onDetailsClick}
                >
                    Details
                </Button>
            </Group>
        </Paper>
    );
};