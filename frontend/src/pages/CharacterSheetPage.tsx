import { useAppSelector } from "../shared/hooks/hooks";
import { AttributesSection } from "../features/sheet/components/AttributesSection";
import { DebugState } from "../shared/components/DebugState";


const CharacterSheetPage = () => {
    const character = useAppSelector((state) => state.character);

    return (
        <>
            <AttributesSection attributes={{ individual: character.attributes.individual }} />
            {process.env.NODE_ENV === 'development' && <DebugState />}
        </>
    );
};

export default CharacterSheetPage;