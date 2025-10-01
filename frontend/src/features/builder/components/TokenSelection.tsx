import { Box, Title, Group, Text, ActionIcon, Stack, TextInput, Flex, Button } from '@mantine/core';
import { IconTrash, IconPlus, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';
import {
    addToken,
    updateToken,
    removeToken,
    type TokenItem,
} from '../../../shared/stores/tokenSlice'; // Assuming 'tokensSlice' is the correct file name based on our final structure


// --- 1. Single Editable Token Row (For Existing Items) ---

const TokenBuilderRow: React.FC<{ token: TokenItem }> = ({ token }) => {
    const dispatch = useAppDispatch();

    // Allows updating only 'name' and 'power' in the Builder View
    const handleUpdate = (field: 'name' | 'power', value: string) => {
        dispatch(updateToken({ id: token.id, [field]: value }));
    };

    const handleRemove = () => {
        if (window.confirm(`Are you sure you want to remove the Token "${token.name || 'Untitled'}"?`)) {
            dispatch(removeToken(token.id));
        }
    };

    return (
        <Group wrap="nowrap" gap="xs" style={{ width: '100%', alignItems: 'center' }} p="sm">
            <TextInput
                value={token.name}
                onChange={(e) => handleUpdate('name', e.currentTarget.value)}
                placeholder="Token Name"
                label="Name"
                style={{ width: '25%' }}
                size="sm"
            />
            <TextInput
                value={token.power}
                onChange={(e) => handleUpdate('power', e.currentTarget.value)}
                placeholder="Power / Details"
                label="Power"
                style={{ flexGrow: 1 }}
                size="sm"
            />
            <TextInput
                label="Default Charges"
                placeholder="3"
                // Shows the default charges, but keeps the field disabled
                value={token.charges !== undefined ? token.charges.toString() : '3'}
                disabled
                style={{ width: '80px' }}
                size="sm"
            />
            <ActionIcon
                size="md"
                variant="subtle"
                color="red"
                onClick={handleRemove}
                title="Remove Token"
                mt={20} // Aesthetic alignment with the label
            >
                <IconTrash size={20} />
            </ActionIcon>
        </Group>
    );
};


// --- 2. New Token Add Row (Always Visible) ---

const TokenAddRow: React.FC = () => {
    const dispatch = useAppDispatch();

    const [newTokenName, setNewTokenName] = useState('');
    const [newTokenPower, setNewTokenPower] = useState('');

    const resetFields = () => {
        setNewTokenName('');
        setNewTokenPower('');
    };

    const handleAddToken = () => {
        // Validation check
        if (!newTokenName.trim() && !newTokenPower.trim()) return;

        dispatch(addToken({
            name: newTokenName.trim(),
            power: newTokenPower.trim(),
            charges: undefined // Starts with undefined charges, typically handled by game logic (default 3)
        }));

        resetFields();
    };

    // Confirm Add is disabled unless at least Name or Power is filled
    const isConfirmDisabled = !newTokenName.trim() && !newTokenPower.trim();
    // Cancel is visible if any field has content
    const isCancelVisible = newTokenName.trim().length > 0 || newTokenPower.trim().length > 0;

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
            <Text fw={500} size="md" c="dimmed">Add New Token</Text>

            <Group grow style={{ width: '100%' }} gap="xs">
                <TextInput
                    placeholder="Token Name (e.g., Blood Talons)"
                    value={newTokenName}
                    onChange={(e) => setNewTokenName(e.currentTarget.value)}
                    label="New Name"
                    style={{ flexGrow: 1 }}
                    size="sm"
                />
                <TextInput
                    placeholder="Token Power (e.g., +1 Die to Attack)"
                    value={newTokenPower}
                    onChange={(e) => setNewTokenPower(e.currentTarget.value)}
                    label="New Power"
                    style={{ flexGrow: 1 }}
                    size="sm"
                />
            </Group>

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
                    onClick={handleAddToken}
                    disabled={isConfirmDisabled}
                >
                    Confirm Add
                </Button>
            </Flex>
        </Stack>
    );
};


// --- 3. Main Token Builder Section ---

export const TokenSelection: React.FC = () => {
    // Assuming the state path is correct based on the separated slice architecture
    const tokens = useAppSelector((state: RootState) => state.character.tokens);

    return (
        <Box>
            <Title order={3} mb="sm">TOKENS</Title>
            <Stack gap="md" mb="md">
                {tokens.length === 0 && (
                    <Text c="dimmed" size="sm">No Tokens tracked.</Text>
                )}
                {/* Display existing Tokens */}
                {tokens.map((token: TokenItem) => (
                    <TokenBuilderRow key={token.id} token={token} />
                ))}
            </Stack>

            {/* Always display the Add Row at the bottom */}
            <TokenAddRow />
        </Box>
    );
};