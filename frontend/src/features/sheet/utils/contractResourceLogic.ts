import { type ContractItem } from '../../../shared/types/contracType';
import { useAppDispatch } from '../../../shared/hooks/hooks';


import { spendGlamour } from '../../../shared/stores/glamourSlice';
import { spendWillpower } from '../../../shared/stores/willpowerSlice';

/**
 * Gestisce l'attivazione del contratto e la spesa automatica delle risorse.
 * @returns true se il contratto è stato attivato.
 */
export const dispatchResourceSpend = (contract: ContractItem, dispatch: ReturnType<typeof useAppDispatch>): boolean => {
    const { costType, costValue, name } = contract;

    // Controlla se il valore del costo è zero o negativo (anche se il tipo non è 'None')
    if (costValue <= 0 && costType !== 'None') {
        console.warn(`[CONTRACTS] Contract ${name} has a zero or negative cost. Activation assumed, no resource spent.`);
        return true;
    }

    if (costType === 'Glamour') {
        dispatch(spendGlamour(costValue));
        console.log(`[CONTRACTS] Contract ${name} activated! Spent ${costValue} ${costType}.`);
        return true;
    }

    if (costType === 'Willpower') {
        dispatch(spendWillpower(costValue));
        console.log(`[CONTRACTS] Contract ${name} activated! Spent ${costValue} ${costType}.`);
        return true;
    }

    if (costType === 'None') {
        console.log(`[CONTRACTS] Contract ${name} activated! (No resource cost).`);
        return true;
    }

    // Per costi non gestiti automaticamente (es. Other)
    console.warn(`[CONTRACTS] Contract ${name} activated! Manual tracking required for ${costValue} ${costType}.`);
    return true; // Consideriamo comunque il contratto 'attivato'

};