import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import { DotRating } from './DotRating';
// --- CORREZIONE QUI: Usiamo 'gainGlamour' al posto di 'regainGlamour' ---
import { spendGlamour, gainGlamour } from '../../../shared/stores/glamourSlice';

export const GlamourTrack = () => {
    const dispatch = useAppDispatch();
    const glamour = useAppSelector((state) => state.character.glamour.current);
    const maxGlamour = useAppSelector((state) => state.character.glamour.max);

    const handleGlamourChange = (newValue: number) => {
        if (newValue > glamour) {
            // Se newValue > glamour, abbiamo guadagnato. Usiamo gainGlamour.
            dispatch(gainGlamour(newValue - glamour));
        } else if (newValue < glamour) {
            // Se newValue < glamour, abbiamo speso. Usiamo spendGlamour.
            dispatch(spendGlamour(glamour - newValue));
        }
        // Se newValue == glamour, non facciamo nulla.
    };

    return (
        <>
            <DotRating 
                rating={glamour} 
                max={maxGlamour} 
                onChange={handleGlamourChange}
                wrap={true}
            />
        </>
    );
};