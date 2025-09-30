import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Box, Title, Stack, Group, Select, ActionIcon,
    Table, Button, Modal, TextInput, Checkbox,
    Text, useMantineTheme,
} from '@mantine/core';
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

// --- Imports from Redux and Data ---
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import { addContract, removeContract, updateContract } from '../../../shared/stores/contractsSlice';
import { CONTRACT_CATALOGUE, EMPTY_CONTRACT } from '../data/contracts';
import type { ContractItem } from '../../../shared/types/contracType';

// Map catalogue data for Mantine Select component
const catalogueOptions = CONTRACT_CATALOGUE.map(c => ({
    value: c.id,
    label: `${c.name} (${c.costValue} ${c.costType})`,
}));

const costTypeOptions = [
    { value: 'Glamour', label: 'Glamour' },
    { value: 'Willpower', label: 'Willpower' },
    { value: 'None', label: 'None' },
    { value: 'Other', label: 'Other (Specify in text)' },
];

// --- Subcomponent: Edit/Add Form ---
interface ContractFormProps {
    contract: ContractItem;
    onSave: (contract: ContractItem) => void;
    onClose: () => void;
}

const ContractForm: React.FC<ContractFormProps> = ({ contract, onSave, onClose }) => {
    const [formData, setFormData] = useState(contract);
    const isEditing = !!contract.id;

    const handleSave = () => {
        onSave(formData);
    };

    const handleChange = (field: keyof ContractItem, value: unknown) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Stack gap="md">
            <Title order={5}>{isEditing ? `Edit Contract: ${contract.name}` : 'Add Custom Contract'}</Title>

            <TextInput
                label="Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
            />
            <Group grow>
                {/* Input per il VALORE del Costo */}
                <TextInput
                    label="Cost Value"
                    type="number"
                    value={formData.costValue.toString()}
                    onChange={(e) => handleChange('costValue', parseInt(e.target.value) || 0)}
                    required
                />
                {/* Select per il TIPO di Costo */}
                <Select
                    label="Cost Type"
                    placeholder="Select Resource"
                    data={costTypeOptions}
                    value={formData.costType}
                    onChange={(value) => handleChange('costType', value)}
                    required
                />
            </Group>
            <TextInput
                label="Dice Pool"
                value={formData.dice}
                onChange={(e) => handleChange('dice', e.target.value)}
            />
            <TextInput
                label="Duration"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
            />

            <TextInput
                label="Loophole (Custom)"
                value={formData.loophole}
                onChange={(e) => handleChange('loophole', e.target.value)}
                placeholder="The specific condition to resolve the contract easily."
            />
            <TextInput
                label="Seeming Benefit"
                value={formData.seemingBenefit}
                onChange={(e) => handleChange('seemingBenefit', e.target.value)}
                placeholder="Benefit linked to the Changeling's Seeming."
            />

            <Checkbox
                label="Goblin Pact?"
                checked={formData.isGoblinPact}
                onChange={(e) => handleChange('isGoblinPact', e.target.checked)}
            />

            <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} disabled={!formData.name || !formData.costValue || !formData.costType}>
                    {isEditing ? 'Save Changes' : 'Add Contract'}
                </Button>
            </Group>
        </Stack>
    );
};


// --- Main Component ---
export const ContractSelection: React.FC = () => {
    const dispatch = useAppDispatch();
    const contracts = useAppSelector((state) => state.character.contracts.list);
    const theme = useMantineTheme();

    // State for Quick Add
    const [selectedContractId, setSelectedContractId] = useState<string | null>(null);

    // State for Modal Editing
    const [opened, { open, close }] = useDisclosure(false);
    const [editingContract, setEditingContract] = useState<ContractItem | null>(null);

    // --- Handlers ---

    const handleQuickAdd = () => {
        if (!selectedContractId) return;

        const contractData = CONTRACT_CATALOGUE.find(c => c.id === selectedContractId);
        if (contractData) {
            // Use Omit to ensure we don't accidentally send an ID to the action
            const { ...payload } = contractData;
            dispatch(addContract(payload));
            setSelectedContractId(null); // Clear selection
        }
    };

    const handleEdit = (contract: ContractItem) => {
        setEditingContract(contract);
        open();
    };

    const handleSave = (updatedContract: ContractItem) => {
        if (updatedContract.id) {
            // It's an edit
            dispatch(updateContract(updatedContract));
        } else {
            // It's a custom add from the modal (needs new ID)
            const payload = { ...updatedContract, id: uuidv4() };
            dispatch(addContract(payload));
        }
        close();
        setEditingContract(null);
    };

    const handleOpenCustomAdd = () => {
        setEditingContract(EMPTY_CONTRACT); // Use the empty template
        open();
    };

    const handleDelete = (id: string) => {
        dispatch(removeContract({ id }));
    };

    const rows = contracts.map((contract) => (
        <Table.Tr key={contract.id}>
            {/* 1. Name (Nome) */}
            <Table.Td style={{ fontWeight: 600 }}>{contract.name}</Table.Td>

            {/* 2. Goblin? (Patto Goblin) */}
            <Table.Td style={{ textAlign: 'center' }}>
                {contract.isGoblinPact ? <Text>Yes</Text> : <Text>No</Text>}
            </Table.Td>

            {/* 3. Cost (Costo) */}
            <Table.Td>{contract.costValue} {contract.costType}</Table.Td>

            {/* 4. Dice Pool (Pool di Dadi) */}
            <Table.Td>{contract.dice}</Table.Td>

            {/* 5. Action (Azione) */}
            <Table.Td>{contract.action}</Table.Td>

            {/* 6. Duration (Durata) */}
            <Table.Td>{contract.duration}</Table.Td>

            {/* 7. Loophole (Via d'Uscita) */}
            <Table.Td>{contract.loophole}</Table.Td>

            {/* 8. Seeming Benefit (Beneficio Aspetto) */}
            <Table.Td>{contract.seemingBenefit}</Table.Td>

            {/* 9. Actions (Azioni) - Modifica/Elimina */}
            <Table.Td style={{ width: 100, textAlign: 'right' }}>
                <Group gap="xs" justify="flex-end">
                    <ActionIcon
                        variant="subtle"
                        c="blue"
                        onClick={() => handleEdit(contract)}
                        title="Edit Contract Details"
                    >
                        <IconEdit size={18} />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        c="red"
                        onClick={() => handleDelete(contract.id)}
                        title="Delete Contract"
                    >
                        <IconTrash size={18} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Box>
            <Title order={3} mb="lg">Contracts</Title>

            {/* --- QUICK ADD SECTION --- (rimane identica) */}
            <Stack mb="xl" style={{ border: `1px solid ${theme.colors.gray[3]}`, padding: theme.spacing.md, borderRadius: theme.radius.sm }}>
                <Title order={4}>Add New Contract</Title>
                <Group wrap="nowrap" gap="xs">
                    <Select
                        placeholder="Select from Catalogue"
                        data={catalogueOptions}
                        value={selectedContractId}
                        onChange={setSelectedContractId}
                        style={{ flexGrow: 1 }}
                        searchable
                    />
                    <ActionIcon
                        variant="filled"
                        c="green"
                        size="lg"
                        onClick={handleQuickAdd}
                        disabled={!selectedContractId}
                        title="Add Selected Contract"
                    >
                        <IconPlus size={20} />
                    </ActionIcon>
                    <Button variant="outline" onClick={handleOpenCustomAdd}>
                        Add Custom
                    </Button>
                </Group>
            </Stack>


            {/* --- CONTRACT LIST --- (la tabella ora visualizza tutti i dati) */}
            <Title order={4} mb="sm">Assigned Contracts ({contracts.length})</Title>
            {contracts.length === 0 ? (
                <Text c="dimmed">The character has no assigned Contracts.</Text>
            ) : (
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        {/* L'intestazione della tabella è già corretta */}
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Goblin</Table.Th>
                            <Table.Th>Cost</Table.Th>
                            <Table.Th>Dice Pool</Table.Th>
                            <Table.Th>Action</Table.Th>
                            <Table.Th>Duration</Table.Th>
                            <Table.Th>Loophole</Table.Th>
                            <Table.Th>Seeming Benefit</Table.Th>
                            <Table.Th style={{ width: 100, textAlign: 'right' }}>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            )}

            {/* --- EDIT/CUSTOM MODAL --- (rimane identico) */}
            <Modal opened={opened} onClose={close} title="Edit Contract" centered size="lg">
                {editingContract && (
                    <ContractForm
                        contract={editingContract}
                        onSave={handleSave}
                        onClose={close}
                    />
                )}
            </Modal>
        </Box>
    );
};