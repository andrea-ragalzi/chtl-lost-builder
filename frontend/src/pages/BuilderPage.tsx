import { Box, Title, Text, Button } from '@mantine/core';
// import { useNavigate } from 'react-router-dom';
import { SeemingSelection } from '../features/builder/components/SeemingSelection';
import { KithSelection } from '../features/builder/components/KithSelection';
import { ConceptSelection } from '../features/builder/components/ConceptSelection';
import { AttributeSelection } from '../features/builder/components/AttributeSelection';
import { SkillSelection } from '../features/builder/components/SkillSelection';
import { SpecialtySelection } from '../features/builder/components/SpecialtySelection';
import { MeritSelection } from '../features/builder/components/MeritSelection';
import { useNavigate } from 'react-router-dom';
import { DebugState } from '../shared/components/DebugState';
import { CharacterDetails } from '../features/builder/components/CharacterDetails';
import { NarrativeList } from '../features/builder/components/NarrativeList';

const BuilderPage = () => {
    const navigate = useNavigate();

    return (
        <Box p="lg" maw={900} mx="auto">
            <Title order={1} mb="md">Costruttore di Personaggi</Title>
            <Text c="dimmed" mb="xl">
                Inizia il tuo viaggio creando il tuo personaggio.
            </Text>
            <CharacterDetails />
            <ConceptSelection />
            <AttributeSelection />
            <SkillSelection />
            <SpecialtySelection />
            <SeemingSelection />
            <KithSelection />
            <MeritSelection />
            <NarrativeList title="Favored Regalia" listKey="favoredRegalia" isBuilderMode={true} listType="standard" maxItems={3} />
            <NarrativeList title="Frailties" listKey="frailties" isBuilderMode={true} listType="standard" maxItems={3} />
            <NarrativeList title="Touchstones" listKey="touchstones" isBuilderMode={true} listType="standard" maxItems={3} />
            <Button
                fullWidth
                size="lg"
                mt="xl"
                onClick={() => navigate('/sheet')}
            >
                Visualizza Scheda Personaggio
            </Button>

            {process.env.NODE_ENV === 'development' && <DebugState />}
        </Box>
    );
};

export default BuilderPage;
