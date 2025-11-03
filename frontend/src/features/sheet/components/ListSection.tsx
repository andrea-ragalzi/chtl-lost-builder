import { Stack, Title, TextInput, ActionIcon, Group, Paper, Text, Button, Checkbox } from '@mantine/core';
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { useAppDispatch } from '../../../shared/hooks/hooks';
import { addItem, removeItem, updateItem } from '../../../shared/stores/narrativeSlice';
import { addCondition, toggleCondition, removeCondition, updateCondition } from '../../../shared/stores/conditionSlice';

type ListKey = 'favoredRegalia' | 'frailties' | 'touchstones' | 'conditions';

interface ConditionItem {
    id: string;
    name: string;
    isActive: boolean;
}

interface ListSectionProps {
    title: string;
    listKey: ListKey;
    items: string[] | ConditionItem[];
    withCheckbox?: boolean;
}

export const ListSection = ({ title, listKey, items, withCheckbox = false }: ListSectionProps) => {
    const dispatch = useAppDispatch();
    const [newItem, setNewItem] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

    const isConditions = listKey === 'conditions';
    const conditionItems = isConditions ? items as ConditionItem[] : [];
    const stringItems = !isConditions ? items as string[] : [];

    const handleAdd = () => {
        if (newItem.trim()) {
            if (isConditions) {
                dispatch(addCondition({ name: newItem.trim() }));
            } else {
                dispatch(addItem({ list: listKey, text: newItem.trim() }));
            }
            setNewItem('');
        }
    };

    const handleRemove = (indexOrId: number | string) => {
        if (isConditions) {
            dispatch(removeCondition({ id: indexOrId as string }));
        } else {
            dispatch(removeItem({ list: listKey, index: indexOrId as number }));
        }
    };

    const handleEdit = (indexOrId: number | string, text: string) => {
        if (isConditions) {
            setEditingId(indexOrId as string);
        } else {
            setEditingIndex(indexOrId as number);
        }
        setEditText(text);
    };

    const handleSaveEdit = () => {
        if (editText.trim()) {
            if (isConditions && editingId !== null) {
                dispatch(updateCondition({ id: editingId, name: editText.trim() }));
                setEditingId(null);
            } else if (editingIndex !== null) {
                dispatch(updateItem({ list: listKey as Exclude<ListKey, 'conditions'>, index: editingIndex, text: editText.trim() }));
                setEditingIndex(null);
            }
            setEditText('');
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditingId(null);
        setEditText('');
    };

    const handleCheckboxChange = (id: string) => {
        if (isConditions) {
            dispatch(toggleCondition({ id }));
        }
    };

    return (
        <Paper p="md" withBorder>
            <Title order={5} mb="sm">{title}</Title>

            <Stack gap="xs">
                {isConditions ? (
                    conditionItems.map((condition) => (
                        <Group key={condition.id} wrap="nowrap" justify="space-between">
                            {editingId === condition.id ? (
                                <>
                                    <TextInput
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        style={{ flex: 1 }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveEdit();
                                            if (e.key === 'Escape') handleCancelEdit();
                                        }}
                                    />
                                    <Group gap="xs">
                                        <Button size="xs" onClick={handleSaveEdit}>Save</Button>
                                        <Button size="xs" variant="subtle" onClick={handleCancelEdit}>Cancel</Button>
                                    </Group>
                                </>
                            ) : (
                                <>
                                    <Group gap="xs" style={{ flex: 1 }} wrap="nowrap">
                                        <Checkbox
                                            checked={!condition.isActive}
                                            onChange={() => handleCheckboxChange(condition.id)}
                                        />
                                        <Text
                                            size="sm"
                                            style={{
                                                flex: 1,
                                                textDecoration: !condition.isActive ? 'line-through' : 'none',
                                                opacity: !condition.isActive ? 0.6 : 1
                                            }}
                                        >
                                            {condition.name}
                                        </Text>
                                    </Group>
                                    <Group gap="xs">
                                        <ActionIcon
                                            size="sm"
                                            variant="subtle"
                                            onClick={() => handleEdit(condition.id, condition.name)}
                                        >
                                            <IconEdit size={16} />
                                        </ActionIcon>
                                        <ActionIcon
                                            size="sm"
                                            variant="subtle"
                                            color="red"
                                            onClick={() => handleRemove(condition.id)}
                                        >
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    </Group>
                                </>
                            )}
                        </Group>
                    ))
                ) : (
                    stringItems.map((item, index) => (
                        <Group key={index} wrap="nowrap" justify="space-between">
                            {editingIndex === index ? (
                                <>
                                    <TextInput
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        style={{ flex: 1 }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveEdit();
                                            if (e.key === 'Escape') handleCancelEdit();
                                        }}
                                    />
                                    <Group gap="xs">
                                        <Button size="xs" onClick={handleSaveEdit}>Save</Button>
                                        <Button size="xs" variant="subtle" onClick={handleCancelEdit}>Cancel</Button>
                                    </Group>
                                </>
                            ) : (
                                <>
                                    <Group gap="xs" style={{ flex: 1 }} wrap="nowrap">
                                        {withCheckbox && (
                                            <Checkbox disabled />
                                        )}
                                        <Text size="sm" style={{ flex: 1 }}>{item}</Text>
                                    </Group>
                                    <Group gap="xs">
                                        <ActionIcon
                                            size="sm"
                                            variant="subtle"
                                            onClick={() => handleEdit(index, item)}
                                        >
                                            <IconEdit size={16} />
                                        </ActionIcon>
                                        <ActionIcon
                                            size="sm"
                                            variant="subtle"
                                            color="red"
                                            onClick={() => handleRemove(index)}
                                        >
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    </Group>
                                </>
                            )}
                        </Group>
                    ))
                )}
            </Stack>

            <Group mt="md" wrap="nowrap">
                <TextInput
                    placeholder={`Add ${title.toLowerCase()}...`}
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAdd();
                    }}
                    style={{ flex: 1 }}
                />
                <ActionIcon onClick={handleAdd} variant="filled" size="lg">
                    <IconPlus size={18} />
                </ActionIcon>
            </Group>
        </Paper>
    );
};