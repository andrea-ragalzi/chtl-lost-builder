import { Stack, Text, TextInput, ActionIcon, Button, Textarea, Group, Fieldset, Box } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { updateMantle } from '../../../shared/stores/mantleSlice';
import type { RootState } from '../../../app/store';

export const MantleSection = () => {
    const dispatch = useAppDispatch();
    const mantles = useAppSelector((state: RootState) => state.character.mantles);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editCourt, setEditCourt] = useState('');
    const [editLevel, setEditLevel] = useState('');
    const [editBenefit, setEditBenefit] = useState('');
    const [editDrawback, setEditDrawback] = useState('');

    const handleEdit = (id: string) => {
        const mantle = mantles.find(m => m.id === id);
        if (mantle) {
            setEditingId(id);
            setEditCourt(mantle.court);
            setEditLevel(mantle.level.toString());
            setEditBenefit(mantle.benefit || '');
            setEditDrawback(mantle.drawback || '');
        }
    };

    const handleSaveEdit = () => {
        if (editingId && editCourt.trim() && editLevel.trim()) {
            dispatch(updateMantle({
                id: editingId,
                court: editCourt.trim(),
                level: parseInt(editLevel) || 0,
                benefit: editBenefit.trim(),
                drawback: editDrawback.trim()
            }));
            setEditingId(null);
            setEditCourt('');
            setEditLevel('');
            setEditBenefit('');
            setEditDrawback('');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditCourt('');
        setEditLevel('');
        setEditBenefit('');
        setEditDrawback('');
    };

    return (
        <Fieldset legend="Mantle" mb="md">

            <Stack gap="md">
                {mantles.length === 0 ? (
                    <Text c="dimmed" size="sm">No mantles added.</Text>
                ) : (
                    mantles.map((mantle) => (
                        <Box key={mantle.id} >
                            {editingId === mantle.id ? (
                                <Stack gap="xs">
                                    <Group wrap="nowrap" gap="xs">
                                        <TextInput
                                            label="Court"
                                            value={editCourt}
                                            onChange={(e) => setEditCourt(e.target.value)}
                                            style={{ flex: 1 }}
                                            size="sm"
                                        />
                                        <TextInput
                                            label="Level"
                                            value={editLevel}
                                            onChange={(e) => setEditLevel(e.target.value)}
                                            style={{ width: '100px' }}
                                            size="sm"
                                        />
                                    </Group>
                                    <Textarea
                                        label="Benefit"
                                        value={editBenefit}
                                        onChange={(e) => setEditBenefit(e.target.value)}
                                        size="sm"
                                        rows={2}
                                    />
                                    <Textarea
                                        label="Drawback"
                                        value={editDrawback}
                                        onChange={(e) => setEditDrawback(e.target.value)}
                                        size="sm"
                                        rows={2}
                                    />
                                    <Group gap="xs" justify="flex-end">
                                        <Button size="xs" onClick={handleSaveEdit}>Save</Button>
                                        <Button size="xs" variant="subtle" onClick={handleCancelEdit}>Cancel</Button>
                                    </Group>
                                </Stack>
                            ) : (
                                <>
                                    <Group justify="space-between" mb="xs">
                                        <Text fw={700} size="sm">{mantle.court} ({mantle.level})</Text>
                                        <Group gap="xs">
                                            <ActionIcon
                                                size="sm"
                                                variant="subtle"
                                                onClick={() => handleEdit(mantle.id)}
                                            >
                                                <IconEdit size={16} />
                                            </ActionIcon>
                                        </Group>
                                    </Group>

                                    {mantle.benefit && (
                                        <Stack gap={4} mb="xs">
                                            <Text size="xs" c="dimmed" fw={500}>Benefit:</Text>
                                            <Text size="sm">{mantle.benefit}</Text>
                                        </Stack>
                                    )}

                                    {mantle.drawback && (
                                        <Stack gap={4}>
                                            <Text size="xs" c="dimmed" fw={500}>Drawback:</Text>
                                            <Text size="sm">{mantle.drawback}</Text>
                                        </Stack>
                                    )}
                                </>
                            )}
                        </Box>
                    ))
                )}
            </Stack>
        </Fieldset>
    );
};