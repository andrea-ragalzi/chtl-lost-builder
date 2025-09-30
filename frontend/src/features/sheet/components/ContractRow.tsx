// src/features/sheet/contracts/ContractRow.tsx

import React from 'react';
import { Table, ActionIcon, Group, Text } from '@mantine/core'; // Tooltip e Stack rimossi
import { IconBolt } from '@tabler/icons-react'; // IconInfoCircle rimosso

import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { type ContractItem } from '../../../shared/types/contracType';
import { dispatchResourceSpend } from '../utils/contractResourceLogic';

interface ContractRowProps {
    contract: ContractItem;
}

export const ContractRow: React.FC<ContractRowProps> = ({ contract }) => {
    const dispatch = useAppDispatch();

    // 1. LEGGIAMO I PUNTI CORRENTI DI GLAMOUR E WILLPOWER
    // Nota: Ho assunto che il path sia corretto, basato sul tuo esempio
    const currentGlamour = useAppSelector(state => state.character.glamour.current);
    const currentWillpower = useAppSelector(state => state.character.willpower.current);

    const costString = contract.costType === 'None' ? 'None' : `${contract.costValue} ${contract.costType}`;

    // 2. FUNZIONE DI CONTROLLO DELLE RISORSE (rimane identica)
    const hasEnoughResources = () => {
        const { costType, costValue } = contract;

        if (costType === 'None' || costType === 'Other') {
            return true;
        }

        if (costType === 'Glamour') {
            return costValue <= currentGlamour;
        }

        if (costType === 'Willpower') {
            return costValue <= currentWillpower;
        }

        return true;
    };

    // Determina se il pulsante deve essere disabilitato
    const isDisabled = !hasEnoughResources();


    return (
        <Table.Tr>
            {/* 1. Nome del Contratto (Colonna Espansa) */}
            <Table.Td style={{ fontWeight: 600 }}>
                {contract.name}
            </Table.Td>

            {/* 2. Azioni (Nuova Colonna) */}
            <Table.Td>{contract.action}</Table.Td>

            {/* 3. Dice Pool */}
            <Table.Td>{contract.dice}</Table.Td>

            {/* 4. Durata (Nuova Colonna) */}
            <Table.Td>{contract.duration}</Table.Td>

            {/* 5. Via d'Uscita (Nuova Colonna) */}
            <Table.Td>{contract.loophole}</Table.Td>

            {/* 6. Beneficio Aspetto (Nuova Colonna) */}
            <Table.Td>{contract.seemingBenefit}</Table.Td>

            {/* 7. Tracciamento Goblin (Sola lettura) */}
            <Table.Td style={{ textAlign: 'center' }}>
                {contract.isGoblinPact ? <Text>Yes</Text> : <Text>No</Text>}
            </Table.Td>

            {/* 8. Costo e Bottone di Attivazione (Colonna Interattiva) */}
            <Table.Td>
                <Group justify="space-between" wrap="nowrap">
                    <Text size="sm">{costString}</Text>
                    {contract.costType !== 'None' && (
                        <ActionIcon
                            variant="filled"
                            color="blue"
                            size="md"
                            onClick={() => dispatchResourceSpend(contract, dispatch)}
                            title={isDisabled ? `NOT ENOUGH ${contract.costType.toUpperCase()}` : `Activate and spend: ${costString}`}
                            disabled={isDisabled}
                        >
                            <IconBolt size={16} />
                        </ActionIcon>
                    )}
                </Group>
            </Table.Td>

        </Table.Tr>
    );
};