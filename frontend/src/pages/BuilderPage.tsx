import { Box, Button, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { SeemingSelection } from '../features/builder/components/SeemingSelection';
import { KithSelection } from '../features/builder/components/KithSelection';
import { ConceptSelection } from '../features/builder/components/ConceptSelection';
import { AttributeSelection } from '../features/builder/components/AttributeSelection';
import { SkillSelection } from '../features/builder/components/SkillSelection';
import { SpecialtySelection } from '../features/builder/components/SpecialtySelection';
import { MeritSelection } from '../features/builder/components/MeritSelection';
import { DebugState } from '../shared/components/DebugState';
import { CharacterDetails } from '../features/builder/components/CharacterDetails';
import { NarrativeList } from '../features/builder/components/NarrativeList';
import { ContractSelection } from '../features/builder/components/ContractSelection';
import { FaeMountSelection } from '../features/builder/components/FaeMountSelection';
import { HollowSelection } from '../features/builder/components/HollowSelection';
import { MantleSelection } from '../features/builder/components/MantleSelection';
import { TokenSelection } from '../features/builder/components/TokenSelection';
import { CombatSelection } from '../features/builder/components/CombatSelection';

const BuilderPage = () => {
    const navigate = useNavigate();
    const theme = useMantineTheme();

    const sectionStyle = {
        backgroundColor: theme.colors.dark[8],
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.lg,
    };

    return (
        <Box p="lg" maw={900} mx="auto">

            <Box style={sectionStyle}>
                <ConceptSelection />
            </Box>

            <Box style={sectionStyle}>
                <CharacterDetails />
            </Box>

            <Box style={sectionStyle}>
                <AttributeSelection />
            </Box>

            <Box style={sectionStyle}>
                <SkillSelection />
            </Box>

            <Box style={sectionStyle}>
                <SpecialtySelection />
            </Box>

            <Box style={sectionStyle}>
                <SeemingSelection />
            </Box>

            <Box style={sectionStyle}>
                <KithSelection />
            </Box>

            <Box style={sectionStyle}>
                <MeritSelection />
            </Box>

            <Box style={sectionStyle}>
                <NarrativeList title="Favored Regalia" listKey="favoredRegalia" isBuilderMode={true} listType="standard" maxItems={3} />
            </Box>

            <Box style={sectionStyle}>
                <NarrativeList title="Frailties" listKey="frailties" isBuilderMode={true} listType="standard" maxItems={3} />
            </Box>

            <Box style={sectionStyle}>
                <NarrativeList title="Touchstones" listKey="touchstones" isBuilderMode={true} listType="standard" maxItems={3} />
            </Box>

            <Box style={sectionStyle}>
                <ContractSelection />
            </Box>

            <Box style={sectionStyle}>
                <FaeMountSelection />
            </Box>

            <Box style={sectionStyle}>
                <HollowSelection />
            </Box>

            <Box style={sectionStyle}>
                <MantleSelection />
            </Box>

            <Box style={sectionStyle}>
                <TokenSelection />
            </Box>

            <Box style={sectionStyle}>
                <CombatSelection />
            </Box>

            <Button
                fullWidth
                size="lg"
                mt="xl"
                onClick={() => navigate('/sheet')}
            >
                Go to Character Sheet
            </Button>

            {process.env.NODE_ENV === 'development' && <DebugState />}
        </Box>
    );
};

export default BuilderPage;
