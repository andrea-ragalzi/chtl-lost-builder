import { Grid, Box, Fieldset } from '@mantine/core';
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
                    <Fieldset legend="Health"  style={{ overflow: 'hidden' }}>
                        <Box pb={5} style={{ maxWidth: '100%' }}>
                            <HealthTrack health={health} />
                        </Box>
                    </Fieldset>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }} py={0}>
                    <Fieldset legend="Willpower" style={{ overflow: 'hidden' }}>
                        <Box style={{ maxWidth: '100%' }}>
                            <WillpowerTrack />
                        </Box>
                    </Fieldset>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }} py={0}>
                    <Fieldset legend="Glamour" style={{ overflow: 'hidden' }}>
                        <Box style={{ maxWidth: '100%' }}>
                            <GlamourTrack />
                        </Box>
                    </Fieldset>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }} py={0}>
                    <Fieldset legend="Clarity" style={{ overflow: 'hidden' }}>
                        <Box style={{ maxWidth: '100%' }}>
                            <ClarityTrack />
                        </Box>
                    </Fieldset>
                </Grid.Col>
            </Grid>
        </Box>
    );
};