import { useState, useMemo } from 'react';
import { Box, Title, Text, Stack, TextInput, Group, ActionIcon } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import { addItem, removeItem, updateItem } from '../../../shared/stores/narrativeSlice';
import { IconPlus, IconTrash } from '@tabler/icons-react';

type ListType = 'standard' | 'numbered';
type ListKey = 'favoredRegalia' | 'frailties' | 'touchstones';

interface NarrativeListProps {
    title: string;
    listKey: ListKey;
    isBuilderMode: boolean;
    listType: ListType;
    maxItems?: number;
}

export const NarrativeList = ({ title, listKey, isBuilderMode, listType, maxItems }: NarrativeListProps) => {
    const dispatch = useAppDispatch();

    const list: string[] = useAppSelector((state) => state.character.narrative[listKey]);
    const [newItemText, setNewItemText] = useState('');

    // Pre-calculate state flags
    const canAddItem = useMemo(() => {
        return !!newItemText && (!maxItems || list.length < maxItems);
    }, [newItemText, maxItems, list.length]);


    const handleAddItem = () => {
        if (canAddItem) {
            dispatch(addItem({ list: listKey, text: newItemText }));
            setNewItemText('');
        }
    };

    const handleRemoveItem = (index: number) => {
        dispatch(removeItem({ list: listKey, index }));
    };

    const handleUpdateItem = (index: number, text: string) => {
        dispatch(updateItem({ list: listKey, index, text }));
    };

    return (
        <Box>
            <Title order={4} mb="sm">{title}</Title>

            <Stack gap="xs">
                {list.map((item: string, index: number) => (
                    <Group key={index} align="center" wrap="nowrap">
                        {listType === 'numbered' && (
                            <Text fw={500} style={{ minWidth: '15px' }}>{index + 1}.</Text>
                        )}

                        {isBuilderMode ? (
                            // --- Builder Mode: Editable Text Input ---
                            <>
                                <TextInput
                                    value={item}
                                    onChange={(e) => handleUpdateItem(index, e.target.value)}
                                    style={{ flexGrow: 1 }}
                                />
                                <ActionIcon
                                    color="red"
                                    variant="light"
                                    onClick={() => handleRemoveItem(index)}
                                >
                                    <IconTrash size={16} />
                                </ActionIcon>
                            </>
                        ) : (
                            // --- View Mode: Simple Text Display ---
                            <Text style={{ flexGrow: 1 }}>{item}</Text>
                        )}
                    </Group>
                ))}
                {/* Display empty state or max items warning if needed */}
                {!isBuilderMode && list.length === 0 && (
                    <Text c="dimmed" size="sm">No {title} currently set.</Text>
                )}
                {isBuilderMode && (
                    <Group  gap="sm">
                        <TextInput
                            placeholder={`Add new ${listKey.toLowerCase()}`}
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            style={{ flex: 1 }}
                            disabled={!!(maxItems && list.length >= maxItems)}
                        />
                        <ActionIcon
                            variant="filled"
                            color="green"
                            onClick={handleAddItem}
                            disabled={!canAddItem}
                        >
                            <IconPlus size={18} />
                        </ActionIcon>
                    </Group>
                )}
            </Stack>
        </Box>
    );
};