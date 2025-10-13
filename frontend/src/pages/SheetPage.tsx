import { SkillsSection } from "../features/sheet/components/SkillsSection";
import { AttributesSection } from "../features/sheet/components/AttributesSection";
import { CharacterDetails } from "../features/sheet/components/CharacterDetails";
import { DebugState } from "../shared/components/DebugState";
import { MeritsSection } from "../features/sheet/components/MeritsSection";
import { DerivedTraits } from "../features/sheet/components/DerivedTraits";
import { ConditionsTrack } from "../features/sheet/components/ConditionsTrack";
import { WyrdTrack } from "../features/sheet/components/WyrdTrack";
import { GlamourTrack } from "../features/sheet/components/GlamourTrack";
import { ClarityTrack } from "../features/sheet/components/ClarityTrack";
import { ContractSection } from "../features/sheet/components/ContractSection";
import { BlessingCurseSection } from "../features/sheet/components/BlessingCurseSection";
import { GoblinDebtTrack } from "../features/sheet/components/GoblinDebtTrack";
import { PledgeTrack } from "../features/sheet/components/PledgeTrack";
import { FaeMountSection } from "../features/sheet/components/FaeMountSection";
import { Button } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import { MantleSection } from '../features/sheet/components/MantleSection';
import { HollowSection } from "../features/sheet/components/HollowSection";
import { TokenSection } from "../features/sheet/components/TokenSection";
import { CombatSection } from "../features/sheet/components/CombatSection";


const SheetPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <CharacterDetails />
            <AttributesSection />
            <SkillsSection />
            <MeritsSection />
            <DerivedTraits />
            <ConditionsTrack />
            <WyrdTrack />
            <GlamourTrack />
            <ClarityTrack />
            <ContractSection />
            <BlessingCurseSection />
            <GoblinDebtTrack />
            <PledgeTrack />
            <FaeMountSection />
            <MantleSection />
            <HollowSection />
            <TokenSection />
            <CombatSection />
            <Button
                fullWidth
                size="lg"
                mt="xl"
                onClick={() => navigate('/')}
            >
                Go to Builder
            </Button>
            {process.env.NODE_ENV === 'development' && <DebugState />}
        </>
    );
};

export default SheetPage;