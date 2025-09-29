import { useState } from 'react';
import { Box, Title, Stack, TextInput, Group, ActionIcon, Checkbox } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import { addCondition, toggleCondition, removeCondition } from '../../../shared/stores/conditionSlice';
import { IconPlus, IconTrash } from '@tabler/icons-react';

export const ConditionsTrack = () => {
    const dispatch = useAppDispatch();
    const conditions = useAppSelector((state) => state.character.conditions.list);
    const [newConditionText, setNewConditionText] = useState('');

    const handleAddCondition = () => {
        if (newConditionText) {
            dispatch(addCondition({ name: newConditionText }));
            setNewConditionText('');
        }
    };

    const handleToggleCondition = (id: string) => {
        dispatch(toggleCondition({ id }));
    };

    const handleRemoveCondition = (id: string) => {
        dispatch(removeCondition({ id }));
    };

    return (
        <Box>
            <Title order={4}>Conditions</Title>
            <Group>
                <TextInput
                    placeholder="New Condition"
                    value={newConditionText}
                    onChange={(e) => setNewConditionText(e.target.value)}
                />
                <ActionIcon onClick={handleAddCondition} disabled={!newConditionText}>
                    <IconPlus size={16} />
                </ActionIcon>
            </Group>
            <Stack>
                {conditions.map((condition) => (
                    <Group key={condition.id} align="center">
                        <Checkbox
                            label={condition.name}
                            checked={condition.isActive}
                            onChange={() => handleToggleCondition(condition.id)}
                        />
                        <ActionIcon onClick={() => handleRemoveCondition(condition.id)}>
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Group>
                ))}
            </Stack>
        </Box>
    );
};