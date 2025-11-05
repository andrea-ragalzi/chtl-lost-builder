import React, { useState } from 'react';
import {
    Box, Text, Modal, useMantineTheme, Stack,
    Fieldset, Group, ActionIcon
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

import { useAppSelector } from '../../../shared/hooks/hooks';
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

const ContractDisplayRow: React.FC<{ contract: ContractItem; onDetailsClick: () => void }> = ({
    contract,
    onDetailsClick
}) => {
    return (
        <Box>
            <Group justify="space-between" mb="xs">
                <Group gap="md">
                    <Text fw={700} size="sm">{contract.name}</Text>
                </Group>
                <ActionIcon
                    size="sm"
                    variant="subtle"
                    onClick={onDetailsClick}
                >
                    <IconInfoCircle size={16} />
                </ActionIcon>
            </Group>
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

    return (
        <>
            <Fieldset legend="Contracts" mb="md">
                <Stack gap="md">
                    {contracts.length === 0 ? (
                        <Text c="dimmed" size="sm">No Contracts assigned. Use the Builder to add powers.</Text>
                    ) : (
                        contracts.map((contract) => (
                            <ContractDisplayRow
                                key={contract.id}
                                contract={contract}
                                onDetailsClick={() => handleDetailsClick(contract)}
                            />
                        ))
                    )}
                </Stack>
            </Fieldset>

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
        </>
    );
};