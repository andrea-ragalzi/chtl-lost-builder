
import { useAppDispatch } from '../../../shared/hooks/hooks';
import { spendGlamour } from '../../../shared/stores/glamourSlice'; 
import { spendWillpower } from '../../../shared/stores/willpowerSlice'; 
import { addDebt } from '../../../shared/stores/goblinDebtSlice'; 
import type { ContractItem } from '../../../shared/types/contracType';


export const dispatchResourceSpend = (contract: ContractItem, dispatch: ReturnType<typeof useAppDispatch>): boolean => {
    const { costType, costValue, name, isGoblinPact } = contract;
    
    const success = true; // Assumiamo successo se le risorse sono sufficienti (controllato in ContractRow.tsx)

    // 1. Spesa delle Risorse
    if (costType === 'Glamour') {
        dispatch(spendGlamour(costValue));
        console.log(`[CONTRACTS] Contract ${name} activated! Spent ${costValue} Glamour.`);
    } else if (costType === 'Willpower') {
        dispatch(spendWillpower(costValue));
        console.log(`[CONTRACTS] Contract ${name} activated! Spent ${costValue} Willpower.`);
    } else {
        console.log(`[CONTRACTS] Contract ${name} activated! (Cost: ${costType}).`);
    }

    // 2. LOGICA DEI DEBITI GOBLIN: AGGIUNTA AUTOMATICA
    if (isGoblinPact) {
        // Creiamo una descrizione base per il Debito che viene aggiunto
        const debtDescription = `Debt for activating Goblin Pact: ${name})`;
        
        // Invia l'azione per aggiungere il Debito Goblin dettagliato
        dispatch(addDebt(debtDescription)); 
        
        console.warn(`[GOBLIN DEBTS] Contract ${name} is a Goblin Pact. Added 1 Goblin Debt.`);
    }
    
    return success;
};