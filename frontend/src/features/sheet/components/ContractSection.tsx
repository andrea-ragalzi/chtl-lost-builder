// src/features/sheet/contracts/ContractSection.tsx

import React from 'react';
import {
    Box, Title, Table, Text
} from '@mantine/core';

import { useAppSelector } from '../../../shared/hooks/hooks';
import { ContractRow } from './ContractRow'; // Importiamo il componente riga

export const ContractSection: React.FC = () => {
    // Leggiamo i contratti dal nodo "contracts" sotto "character"
    const contracts = useAppSelector((state) => state.character.contracts.list);

    const rows = contracts.map((contract) => (
        <ContractRow key={contract.id} contract={contract} />
    ));

    return (
        <Box>
            <Title order={3} mb="md">Contracts</Title>

            {contracts.length === 0 ? (
                <Text c="dimmed">No Contracts assigned. Use the Builder to add powers.</Text>
            ) : (
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ width: '15%' }}>Name</Table.Th>
                            <Table.Th style={{ width: '8%' }}>Action</Table.Th>
                            <Table.Th style={{ width: '15%' }}>Dice Pool</Table.Th>
                            <Table.Th style={{ width: '10%' }}>Duration</Table.Th>
                            <Table.Th style={{ width: '18%' }}>Loophole</Table.Th>
                            <Table.Th style={{ width: '18%' }}>Seeming Benefit</Table.Th>
                            <Table.Th style={{ width: '5%', textAlign: 'center' }}>Goblin</Table.Th>
                            <Table.Th style={{ width: '11%' }}>Cost / Activate</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            )}
        </Box>
    );
};