import { Box, Title, Group, Text, Stack, TextInput, ActionIcon } from '@mantine/core';
import { IconReload } from '@tabler/icons-react';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';
import { updateTokenCharges } from '../../../shared/stores/tokenSlice';

const TokenTrackingRow: React.FC<{ id: string }> = ({ id }) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state: RootState) => 
        state.character.tokens.find(t => t.id === id)
    );

    if (!token) return null;

    const handleChargesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value, 10);
        const charges = isNaN(value) ? undefined : value;
        dispatch(updateTokenCharges({ id: token.id, charges }));
    };
    
    const handleReload = () => {
        const maxCharges = 3;
        dispatch(updateTokenCharges({ id: token.id, charges: maxCharges }));
    };

    return (
        <Group wrap="nowrap" gap="xs" style={{ width: '100%', alignItems: 'center' }}>
            <Stack gap={0} style={{ flexGrow: 1 }}>
                <Text size="sm" fw={500}>{token.name || "Token Senza Nome"}</Text>
                <Text size="xs" c="dimmed">{token.power || "Nessun Potere Descritto"}</Text>
            </Stack>
            
            <TextInput
                label="Cariche"
                placeholder="0"
                value={token.charges !== undefined ? token.charges.toString() : ''}
                onChange={handleChargesChange}
                style={{ width: '60px' }}
                type="number"
                size="sm"
            />
            <ActionIcon
                size="md"
                variant="subtle"
                color="blue"
                onClick={handleReload}
                title="Ricarica Token (MAX)"
            >
                <IconReload size={18} />
            </ActionIcon>
        </Group>
    );
};

export const TokenSection = () => {
    const tokens = useAppSelector((state: RootState) => state.character.tokens);
    
    return (
        <Box>
            <Title order={4} mb="sm">TOKENS</Title>
            <Stack gap="md" mb="md">
                {tokens.length === 0 ? (
                    <Text c="dimmed" size="sm">Nessun Token tracciato. Aggiungi nel Builder.</Text>
                ) : (
                    tokens.map(token => (
                        <TokenTrackingRow key={token.id} id={token.id} />
                    ))
                )}
            </Stack>
        </Box>
    );
};