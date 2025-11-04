import React, { useState } from 'react';
import {
    Box, Title, Text, Modal, useMantineTheme, Stack
} from '@mantine/core';

import { useAppSelector } from '../../../shared/hooks/hooks';
import { ContractRow } from './ContractRow';
import type { ContractItem } from '../../../shared/types/contracType';

const ContractDetailsModal: React.FC<{ contract: ContractItem | null }> = ({ contract }) => {
    if (!contract) return null;

    return (
        <Box>
            <Text style={{ whiteSpace: 'pre-wrap' }}>
                {contract.description}
            </Text>
        </Box>
    );
};

export const ContractSection: React.FC = () => {
    const contracts = useAppSelector((state) => state.character.contracts.list);
    const [opened, setOpened] = useState(false);
    const [selectedContract, setSelectedContract] = useState<ContractItem | null>(null);
    const theme = useMantineTheme();

    const handleDetailsClick = (contract: ContractItem) => {
        setSelectedContract(contract);
        setOpened(true);
    };

    const contractItems = contracts.map((contract) => (
        <ContractRow
            key={contract.id}
            contract={contract}
            onDetailsClick={() => handleDetailsClick(contract)}
        />
    ));

    return (
        <Box mb="md">
            <Title order={3} mb="md">Contracts</Title>

            {contracts.length === 0 ? (
                <Text c="dimmed">No Contracts assigned. Use the Builder to add powers.</Text>
            ) : (
                <Stack>
                    {contractItems}
                </Stack>
            )}

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={selectedContract?.name || 'Contract Details'}
                centered
                size="lg"
                overlayProps={{
                    color: theme.colors.dark[9],
                    opacity: 0.55,
                    blur: 3,
                }}
            >
                <ContractDetailsModal contract={selectedContract} />
            </Modal>
        </Box>
    );
};