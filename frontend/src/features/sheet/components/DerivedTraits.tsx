import { Grid, Text, Box, Paper } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { HealthTrack } from './HealthTrack';
import { WillpowerTrack } from './WillpowerTrack';
import { GlamourTrack } from './GlamourTrack';
import { ClarityTrack } from './ClarityTrack';

export const DerivedTraits = () => {
    const { attributes } = useAppSelector((state) => state.character);
    const individualAttributes = attributes.individual;
    const baseSize = 5;
    const health = individualAttributes.stamina + baseSize;

    return (
        <Box w="100%" mb="md">
            <Grid gutter="xs">
                <Grid.Col span={{ base: 6, md: 3 }} py={0}>
                    <Paper p="xs" withBorder style={{ overflow: 'hidden' }}>
                        <Text fw={500} mb="xs" size="sm">Health</Text>
                        <Box pb={5} style={{ maxWidth: '100%' }}>
                            <HealthTrack health={health} />
                        </Box>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }} py={0}>
                    <Paper p="xs" withBorder style={{ overflow: 'hidden' }}>
                        <Text fw={500} mb="xs" size="sm">Willpower</Text>
                        <Box style={{ maxWidth: '100%' }}>
                            <WillpowerTrack />
                        </Box>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }} py={0}>
                    <Paper p="xs" withBorder style={{ overflow: 'hidden' }}>
                        <Text fw={500} mb="xs" size="sm">Glamour</Text>
                        <Box style={{ maxWidth: '100%' }}>
                            <GlamourTrack />
                        </Box>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }} py={0}>
                    <Paper p="xs" withBorder style={{ overflow: 'hidden' }}>
                        <Text fw={500} mb="xs" size="sm">Clarity</Text>
                        <Box style={{ maxWidth: '100%' }}>
                            <ClarityTrack />
                        </Box>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Box>
    );
};