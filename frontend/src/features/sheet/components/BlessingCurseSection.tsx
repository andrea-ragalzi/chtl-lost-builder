import { Box, Title, Text, SimpleGrid, Card } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';

// --- Importiamo i cataloghi statici ---
// Assicurati che i path di import siano corretti nel tuo progetto
import { seemingData } from '../../../shared/data/seemingData'; 
import { kithData } from '../../../shared/data/kithData';


export const BlessingCurseSection = () => {
    // 1. Leggiamo solo i Seeming/Kith selezionati (assumiamo siano gli ID/valori)
    // Ho adattato il path in base al tuo ultimo esempio (state.character.seeming.selected)
    const selectedSeeming = useAppSelector((state) => state.character.seeming.selected);
    const selectedKith = useAppSelector((state) => state.character.kith.selected);

    const seemingBlessing = seemingData.find(s => s.value === selectedSeeming)?.blessing || 'N/A';
    const seemingCurse = seemingData.find(s => s.value === selectedSeeming)?.curse || 'N/A';
    const kithBlessing = kithData.find(k => k.value === selectedKith)?.blessing || 'N/A';

    return (
        <Box>
            <Title order={3} mb="md">Seeming & Kith Traits</Title>

            {/* Griglia per Blessing, Curse e Kith Blessing */}
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                
                {/* 1. Seeming Blessing */}
                <Card withBorder padding="sm">
                    <Text fw={700} mb={5} c="teal">Seeming Blessing</Text>
                    <Text size="sm">{seemingBlessing}</Text>
                </Card>
                
                {/* 2. Seeming Curse */}
                <Card withBorder padding="sm">
                    <Text fw={700} mb={5} c="red">Seeming Curse</Text>
                    <Text size="sm">{seemingCurse}</Text>
                </Card>
                
                {/* 3. Kith Blessing */}
                <Card withBorder padding="sm">
                    <Text fw={700} mb={5} c="teal">Kith Blessing</Text>
                    <Text size="sm">{kithBlessing}</Text>
                </Card>

            </SimpleGrid>
        </Box>
    );
};