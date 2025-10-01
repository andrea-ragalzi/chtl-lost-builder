import { TextInput, Textarea } from '@mantine/core';
import React, { type JSX } from 'react';

// --- Definizione dei Tipi ---

// Tipo base per le props comuni
interface BaseProps {
    label: string;
    placeholder?: string;
}

// 1. Overload per input di tipo 'text' o 'textarea' (value: string)
interface TextProps extends BaseProps {
    type: 'text' | 'textarea';
    value: string;
    onChange: (value: string) => void;
    rows?: number;
}

// 2. Overload per input di tipo 'number' (value: number)
interface NumberProps extends BaseProps {
    type: 'number';
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

// Interfaccia combinata (solo per uso interno)
type MeritInputProps = TextProps | NumberProps;

// --- Component Overloads (Risolvono la compatibilità del genitore) ---

export function MeritInput(props: TextProps): JSX.Element;
export function MeritInput(props: NumberProps): JSX.Element;

// --- Implementazione del Componente ---

export function MeritInput(props: MeritInputProps) {

    if (props.type === 'text' || props.type === 'textarea') {
        const { type: _type, onChange, value, ...rest } = props as TextProps;
        const Component = _type === 'text' ? TextInput : Textarea;

        return (
            <Component
                {...rest}
                value={value}
                onChange={(e) => onChange(e.currentTarget.value)}
            />
        );
    }

    if (props.type === 'number') {
        const { onChange, value, min, max, ...rest } = props as NumberProps;
        
        // Logica di conversione e gestione input per i numeri
        const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const strValue = e.currentTarget.value.trim();
            let numericValue: number;

            if (strValue === '') {
                numericValue = 0; // Tratta stringa vuota come 0, o undefined se preferisci
            } else {
                numericValue = parseInt(strValue, 10);
                
                // Opzione: Valida min/max durante la digitazione (opzionale, ma sicuro)
                if (min !== undefined && numericValue < min) numericValue = min;
                if (max !== undefined && numericValue > max) numericValue = max;
            }

            // Chiamiamo onChange SOLO se il valore è un numero valido
            if (!isNaN(numericValue)) {
                onChange(numericValue);
            }
        };

        return (
            <TextInput
                {...rest}
                value={value.toString()} // Passa il valore come stringa per l'input HTML
                onChange={handleNumberChange}
                type="number" // Imposta il tipo HTML corretto per la tastiera su mobile
                inputMode="numeric" // Suggerisce la tastiera numerica
            />
        );
    }
    
    return null;
}