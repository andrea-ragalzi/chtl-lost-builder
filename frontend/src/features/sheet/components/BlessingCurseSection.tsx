import { Box, SimpleGrid } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { seemingData } from '../../../shared/data/seemingData';
import { kithData } from '../../../shared/data/kithData';
import { SimpleList } from './SimpleList';

export const BlessingCurseSection = () => {
    const selectedSeeming = useAppSelector((state) => state.character.seeming.selected);
    const selectedKith = useAppSelector((state) => state.character.kith.selected);

    const seemingBlessing = seemingData.find(s => s.value === selectedSeeming)?.blessing || 'No Seeming selected';
    const seemingCurse = seemingData.find(s => s.value === selectedSeeming)?.curse || 'No Seeming selected';
    const kithBlessing = kithData.find(k => k.value === selectedKith)?.blessing || 'No Kith selected';

    return (
        <Box mb="md">
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                <SimpleList
                    title="Seeming Blessing"
                    items={selectedSeeming ? [seemingBlessing] : []}
                />

                <SimpleList
                    title="Seeming Curse"
                    items={selectedSeeming ? [seemingCurse] : []}
                />

                <SimpleList
                    title="Kith Blessing"
                    items={selectedKith ? [kithBlessing] : []}
                />
            </SimpleGrid>
        </Box>
    );
};