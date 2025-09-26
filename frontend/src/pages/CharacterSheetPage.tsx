import { SkillsSection } from "../features/sheet/components/SkillsSection";
import { AttributesSection } from "../features/sheet/components/AttributesSection";
import { CharacterDetails } from "../features/sheet/components/CharacterDetails";
import { DebugState } from "../shared/components/DebugState";


const CharacterSheetPage = () => {

    return (
        <>
            <CharacterDetails />
            <AttributesSection />
            <SkillsSection />
            {process.env.NODE_ENV === 'development' && <DebugState />}
        </>
    );
};

export default CharacterSheetPage;