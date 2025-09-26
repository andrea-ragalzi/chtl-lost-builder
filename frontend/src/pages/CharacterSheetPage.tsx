import { SkillsSection } from "../features/sheet/components/SkillsSection";
import { AttributesSection } from "../features/sheet/components/AttributesSection";
import { CharacterDetails } from "../features/sheet/components/CharacterDetails";
import { DebugState } from "../shared/components/DebugState";
import { MeritsSection } from "../features/sheet/components/MeritsSection";
import { DerivedTraits } from "../features/sheet/components/DerivedTraits";


const CharacterSheetPage = () => {

    return (
        <>
            <CharacterDetails />
            <AttributesSection />
            <SkillsSection />
            <MeritsSection />
            <DerivedTraits />
            {process.env.NODE_ENV === 'development' && <DebugState />}
        </>
    );
};

export default CharacterSheetPage;