import { Box, Title, Stack } from '@mantine/core';
import { MantleSection } from './MantleSection';
import { HollowSection } from './HollowSection';
import { FaeMountSection } from './FaeMountSection';
import { TokenSection } from './TokenSection';


export const ExpandedMeritsTrack = () => {
    return (
        <Box>
            <Title order={3} mb="md">Expanded Merits</Title>

            <Stack gap="xl">
                
                {/* I quattro componenti distinti */}
                <MantleSection />
                <HollowSection />
                <FaeMountSection />
                <TokenSection />
                
            </Stack>
        </Box>
    );
};