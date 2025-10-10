import React, { useState } from 'react';
import {
    Box, Title, Stack, Button,
    Text, TextInput, Flex, Textarea, useMantineTheme, Group, ActionIcon,
} from '@mantine/core';
import { IconPlus, IconX, IconTrash } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { addContract, removeContract, updateContract } from '../../../shared/stores/contractsSlice';
import { type ContractItem, EMPTY_CONTRACT_TEMPLATE } from '../../../shared/types/contracType';

// --- 1. Riga per un contratto esistente ---
const ContractInlineRow: React.FC<{ contract: ContractItem }> = ({ contract }) => {
    const dispatch = useAppDispatch();
    const theme = useMantineTheme();

    const handleUpdate = (field: keyof ContractItem, value: string) => {
        dispatch(updateContract({ id: contract.id, [field]: value }));
    };

    const handleRemove = () => {
        if (window.confirm(`Sei sicuro di voler rimuovere il Contratto "${contract.name}"?`)) {
            dispatch(removeContract({ id: contract.id }));
        }
    };

    return (
        <Stack
            gap="sm"
            p="sm"
            style={{ border: `1px solid ${theme.colors.gray[3]}`, borderRadius: '4px' }}
        >
            <Group justify="space-between">
                <TextInput
                    label="Name"
                    value={contract.name}
                    onChange={(e) => handleUpdate('name', e.currentTarget.value)}
                    placeholder="Contract Name"
                />
                <ActionIcon size="sm" color="red" onClick={handleRemove} aria-label="Remove contract">
                    <IconTrash size="0.8rem" />
                </ActionIcon>
            </Group>
            <Textarea
                label="Description"
                value={contract.description}
                onChange={(e) => handleUpdate('description', e.currentTarget.value)}
                placeholder="Descrizione degli effetti del contratto..."
                autosize
                minRows={2}
            />
        </Stack>
    );
};

// --- 2. Form per aggiungere un nuovo contratto ---
const ContractAddRow: React.FC = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState(EMPTY_CONTRACT_TEMPLATE);

    const resetFields = () => {
        setFormData(EMPTY_CONTRACT_TEMPLATE);
    };

    const handleAddContract = () => {
        if (!formData.name.trim()) return;
        dispatch(addContract({ name: formData.name.trim(), description: formData.description }));
        resetFields();
    };

    const handleChange = (field: keyof typeof EMPTY_CONTRACT_TEMPLATE, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isConfirmDisabled = !formData.name.trim();
    const isCancelVisible = formData.name.trim() || formData.description.trim();

    return (
        <Stack
            gap="sm"
            p="sm"
            style={{ border: '2px dashed var(--mantine-color-gray-5)', borderRadius: '4px', marginTop: '15px' }}
        >
            <Text fw={500} size="md" c="dimmed">Add New Contract</Text>

            <TextInput
                label="Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.currentTarget.value)}
                placeholder="Contract Name"
                required
            />

            <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.currentTarget.value)}
                placeholder="Descrizione degli effetti del contratto..."
                autosize
                minRows={3}
            />

            <Flex justify="flex-end" mt="xs">
                {isCancelVisible && (
                    <Button variant="subtle" leftSection={<IconX size={16} />} onClick={resetFields} color="red" mr="xs">
                        Cancel
                    </Button>
                )}
                <Button leftSection={<IconPlus size={16} />} onClick={handleAddContract} disabled={isConfirmDisabled}>
                    Confirm Add
                </Button>
            </Flex>
        </Stack>
    );
};

// --- 3. Componente Principale ---
export const ContractSelection: React.FC = () => {
    const contracts = useAppSelector((state) => state.character.contracts.list); // Ottieni la lista dei contratti dallo store Redux

    return (
        <Box>
            <Title order={3} mb="sm">Contracts</Title>

            {/* Mostra i contratti esistenti */}
            <Stack>
                {contracts.map((contract) => (
                    <ContractInlineRow key={contract.id} contract={contract} />
                ))}
            </Stack>

            {/* Form per aggiungere nuovi contratti */}
            <ContractAddRow />
        </Box>
    );
};