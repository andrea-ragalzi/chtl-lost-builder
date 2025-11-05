import { Box, Fieldset, SimpleGrid, Text } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { seemingData } from '../../../shared/data/seemingData';
import { kithData } from '../../../shared/data/kithData';

export const BlessingCurseSection = () => {
    const selectedSeeming = useAppSelector((state) => state.character.seeming.selected);
    const selectedKith = useAppSelector((state) => state.character.kith.selected);

    const seemingBlessing = seemingData.find(s => s.value === selectedSeeming)?.blessing || 'No Seeming selected';
    const seemingCurse = seemingData.find(s => s.value === selectedSeeming)?.curse || 'No Seeming selected';
    const kithBlessing = kithData.find(k => k.value === selectedKith)?.blessing || 'No Kith selected';

    return (
        <Box mb="md">
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                <Fieldset legend="Seeming Blessing">
                    <Text>{seemingBlessing}</Text>
                </Fieldset>
                <Fieldset legend="Seeming Curse">
                    <Text>{seemingCurse}</Text>
                </Fieldset>
                <Fieldset legend="Kith Blessing">
                    <Text>{kithBlessing}</Text>
                </Fieldset>

            </SimpleGrid>
        </Box>
    );
};