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


const CharacterSheetPage = () => {

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
            {process.env.NODE_ENV === 'development' && <DebugState />}
        </>
    );
};

export default CharacterSheetPage;