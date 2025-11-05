import { Box, Title, ActionIcon, Button, Stack, Textarea, Group, Text, Flex, TextInput } from '@mantine/core';
import { IconTrash, IconPlus, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';
import {
    addFaeMount,
    removeFaeMount,
    updateFaeMount,
    type FaeMountItem
} from '../../../shared/stores/faeMountSlice';


const FaeMountBuilderRow: React.FC<{ mount: FaeMountItem }> = ({ mount }) => {
    const dispatch = useAppDispatch();

    const handleUpdate = (value: string) => {
        dispatch(updateFaeMount({ id: mount.id, description: value }));
    };

    const handleRemove = () => {
        if (window.confirm("Sei sicuro di voler rimuovere questa Cavalcatura Fae?")) {
            dispatch(removeFaeMount(mount.id));
        }
    };

    const mountTitle = mount.description.substring(0, 40).trim() || 'Cavalcatura Fae';

    return (
        <Stack gap="xs" p="sm" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: '4px' }}>
            <Group justify="space-between" align="center">
                <Text fw={700} size="sm">{mountTitle}</Text>
                <ActionIcon
                    size="md"
                    variant="subtle"
                    color="red"
                    onClick={handleRemove}
                    title="Rimuovi Cavalcatura"
                >
                    <IconTrash size={20} />
                </ActionIcon>
            </Group>
            <Textarea
                placeholder="Descrizione, Statistiche e Abilità della Cavalcatura Fae..."
                value={mount.description}
                onChange={(e) => handleUpdate(e.currentTarget.value)}
                rows={3}
                label="Descrizione Completa"
            />
        </Stack>
    );
};

const FaeMountAddRow: React.FC = () => {
    const dispatch = useAppDispatch();
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const resetFields = () => {
        setNewName('');
        setNewDescription('');
    };

    const handleAddMount = () => {
        if (!newDescription.trim()) return;

        dispatch(addFaeMount({
            name: newName.trim(),
            description: newDescription.trim()
        }));

        resetFields();
    };

    const isConfirmDisabled = !newDescription.trim();
    const isCancelVisible = newDescription.trim().length > 0;

    return (
        <Stack
            gap="xs"
            p="sm"
            style={{
                border: '2px dashed var(--mantine-color-gray-5)',
                borderRadius: '4px',
                marginTop: '15px'
            }}
        >
            <Text fw={500} size="md" c="dimmed">Add New Fae Mount</Text>
            <TextInput
                placeholder="Name of the fae mount..."
                value={newName}
                onChange={(e) => setNewName(e.currentTarget.value)}
                label="Name"
            />
            <Textarea
                placeholder="Describe the fae mount..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.currentTarget.value)}
                rows={3}
                label="Description"
            />

            <Flex justify="flex-end" mt="xs">
                {isCancelVisible && (
                    <Button
                        variant="subtle"
                        leftSection={<IconX size={16} />}
                        onClick={resetFields}
                        color="red"
                        mr="xs"
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    leftSection={<IconPlus size={16} />}
                    onClick={handleAddMount}
                    disabled={isConfirmDisabled}
                >
                    Confirm Addition
                </Button>
            </Flex>
        </Stack>
    );
};

export const FaeMountSelection: React.FC = () => {
    const mounts = useAppSelector((state: RootState) => state.character.faeMounts);

    return (
        <Box>
            <Title order={3} mb="sm">FAE MOUNT</Title>
            <Stack gap="md" mb="md">
                {mounts.length === 0 && (
                    <Text c="dimmed" size="sm">No fae mount tracked.</Text>
                )}
                {mounts.map((mount: FaeMountItem) => (
                    <FaeMountBuilderRow key={mount.id} mount={mount} />
                ))}
            </Stack>
            <FaeMountAddRow />
        </Box>
    );
};