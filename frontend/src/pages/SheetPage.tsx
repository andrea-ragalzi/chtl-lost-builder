import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Box, rem, Button, Divider, Title, Text } from '@mantine/core';
import { IconBolt, IconFeather, IconId, IconBackpack, IconBook } from '@tabler/icons-react';

import { CharacterDetails } from "../features/sheet/components/CharacterDetails";
import { MeritsSection } from "../features/sheet/components/MeritsSection";
import { ConditionsTrack } from "../features/sheet/components/ConditionsTrack";
import { WyrdTrack } from "../features/sheet/components/WyrdTrack";
import { ContractSection } from "../features/sheet/components/ContractSection";
import { BlessingCurseSection } from "../features/sheet/components/BlessingCurseSection";
import { GoblinDebtTrack } from "../features/sheet/components/GoblinDebtTrack";
import { PledgeTrack } from '../features/sheet/components/PledgeTrack';
import { FaeMountSection } from "../features/sheet/components/FaeMountSection";
import { MantleSection } from '../features/sheet/components/MantleSection';
import { HollowSection } from "../features/sheet/components/HollowSection";
import { CombatSection } from "../features/sheet/components/CombatSection";
import { AttributesSection } from '../features/sheet/components/AttributesSection';
import { SkillsSection } from '../features/sheet/components/SkillsSection';
import { DerivedTraits } from '../features/sheet/components/DerivedTraits';
import { TouchstonesSection } from '../features/sheet/components/TouchstoneSection';
import { AspirationsTrack } from '../features/sheet/components/AspirationsTrack';
import { ExperienceTrack } from '../features/sheet/components/ExperienceTrack';
import { FrailtiesSection } from '../features/sheet/components/FrailtiesSection';
import { FavoredRegaliaSection } from '../features/sheet/components/FavoredRegaliaSection';

const TAB_GROUPS = {
    BOARD: 'board',
    STORY: 'story',
    FAE: 'fae_powers',
    PROFILE: 'profile',
    EQUIPMENT: 'equipment',
} as const;

const SheetPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string | null>(TAB_GROUPS.BOARD);
    const iconStyle = { width: rem(20), height: rem(20) };

    const TABS_HEIGHT = 60;
    const minContentHeight = `calc(100vh - ${rem(TABS_HEIGHT)} - ${rem(40)})`;

    const panelStyle = {
        minHeight: minContentHeight,
        paddingBottom: rem(TABS_HEIGHT + 10)
    };

    return (
        <Box>
            <Box p="md">
                <Tabs value={activeTab} onChange={setActiveTab} variant="default">

                    <Tabs.Panel value={TAB_GROUPS.BOARD} style={panelStyle}>
                        <DerivedTraits />
                        <AttributesSection />
                        <SkillsSection />
                        <CombatSection />
                    </Tabs.Panel>

                    <Tabs.Panel value={TAB_GROUPS.STORY} style={panelStyle}>
                        <ExperienceTrack />
                        <AspirationsTrack />
                        <TouchstonesSection />
                        <PledgeTrack />
                        <GoblinDebtTrack />
                        <ConditionsTrack />
                    </Tabs.Panel>

                    <Tabs.Panel value={TAB_GROUPS.FAE} style={panelStyle}>
                        <WyrdTrack />
                        <MantleSection />
                        <ContractSection />
                        <BlessingCurseSection />
                        <HollowSection />
                        <FrailtiesSection />
                        <FavoredRegaliaSection />
                    </Tabs.Panel>

                    <Tabs.Panel value={TAB_GROUPS.PROFILE} style={panelStyle}>
                        <Title order={3} mb="md">Character Details & Concept</Title>

                        <Divider my="md" label="Basic Character Information" labelPosition="center" />
                        <CharacterDetails />

                        <Divider my="md" label="Narrative Details & Notes" labelPosition="center" />
                        <Text ml="md">Needle / Thread</Text>
                        <Text ml="md">Background Notes</Text>

                        <Button
                            fullWidth
                            size="lg"
                            mt="xl"
                            onClick={() => navigate('/')}
                        >
                            Back to Builder
                        </Button>
                    </Tabs.Panel>

                    <Tabs.Panel value={TAB_GROUPS.EQUIPMENT} style={panelStyle}>
                        <Title order={3} mb="md">Advantages & Equipment</Title>

                        <Divider my="md" label="Permanent Advantages" labelPosition="center" />
                        <MeritsSection />
                        <FaeMountSection />
                        <HollowSection />

                    </Tabs.Panel>

                </Tabs>
            </Box>

            <Box
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 200,
                    backgroundColor: 'var(--mantine-color-body)',
                    borderTop: `1px solid var(--mantine-color-gray-7)`,
                    padding: '4px 8px',
                    height: rem(TABS_HEIGHT)
                }}
            >
                <Tabs value={activeTab} onChange={setActiveTab} variant="default">
                    <Tabs.List
                        grow
                        style={{
                            flexWrap: 'nowrap',
                            overflow: 'hidden'
                        }}
                    >
                        <Tabs.Tab
                            value={TAB_GROUPS.BOARD}
                            leftSection={<IconBolt style={iconStyle} />}
                            style={{ minWidth: 0, flex: 1 }}
                        >
                            <Box component="span" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>Board</Box>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value={TAB_GROUPS.STORY}
                            leftSection={<IconBook style={iconStyle} />}
                            style={{ minWidth: 0, flex: 1 }}
                        >
                            <Box component="span" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>Story</Box>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value={TAB_GROUPS.FAE}
                            leftSection={<IconFeather style={iconStyle} />}
                            style={{ minWidth: 0, flex: 1 }}
                        >
                            <Box component="span" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>Fae</Box>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value={TAB_GROUPS.PROFILE}
                            leftSection={<IconId style={iconStyle} />}
                            style={{ minWidth: 0, flex: 1 }}
                        >
                            <Box component="span" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>Profile</Box>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value={TAB_GROUPS.EQUIPMENT}
                            leftSection={<IconBackpack style={iconStyle} />}
                            style={{ minWidth: 0, flex: 1 }}
                        >
                            <Box component="span" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>Equipment</Box>
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </Box>
        </Box>
    );
};

export default SheetPage;
