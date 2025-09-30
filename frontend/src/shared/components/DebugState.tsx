import { Paper, Title, Code, Collapse, Group, ActionIcon, type MantineStyleProp } from '@mantine/core';
import { useAppSelector } from '../hooks/hooks';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React, { useState, useRef, useCallback } from 'react';

export const DebugState = () => {
    const [isOpen, { toggle }] = useDisclosure(true);
    const builderState = useAppSelector((state) => state.character);

    // Stato per la posizione del componente
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // Stato per tracciare se il trascinamento è attivo
    const [isDragging, setIsDragging] = useState(false);
    // Ref per memorizzare la posizione iniziale del mouse durante il drag
    const dragStartRef = useRef({ x: 0, y: 0 });
    // Ref per l'elemento Paper
    const paperRef = useRef<HTMLDivElement>(null);
    // Ref per tracciare se un trascinamento è avvenuto
    const hasDraggedRef = useRef(false);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        // Previene la selezione del testo durante il drag
        e.preventDefault();
        // Resetta lo stato del drag all'inizio di un nuovo click
        hasDraggedRef.current = false;
        setIsDragging(true);
        // Salva la posizione iniziale del mouse relativa alla posizione corrente del componente
        dragStartRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    }, [position]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            // Se il mouse si muove mentre si trascina, segna che un drag è avvenuto
            hasDraggedRef.current = true;
            // Calcola la nuova posizione
            const newX = e.clientX - dragStartRef.current.x;
            const newY = e.clientY - dragStartRef.current.y;
            setPosition({ x: newX, y: newY });
        }
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Aggiunge e rimuove i listener globali per mousemove e mouseup
    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    // Stili per il posizionamento e il trascinamento
    const finalStyle: React.CSSProperties = {
        position: 'fixed',
        zIndex: 1000,
        bottom: 20,
        right: 20,
        cursor: isDragging ? 'grabbing' : 'grab',
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        width: isOpen ? 400 : 100,
        maxWidth: '90vw',
        maxHeight: '80vh',
        overflowY: 'auto',
        userSelect: 'none', // Impedisce la selezione del testo
    };

    return (
        <Paper
            ref={paperRef}
            withBorder
            p="md"
            mt="xl"
            style={finalStyle as MantineStyleProp}
        >
            <Group
                onMouseDown={handleMouseDown}
                onClick={() => {
                    // Esegui il toggle solo se non c'è stato un trascinamento
                    if (!hasDraggedRef.current) {
                        toggle();
                    }
                }}
                justify="space-between"
                style={{
                    cursor: 'inherit', // Eredita il cursore dal genitore
                    touchAction: 'none',
                }}
            >
                {isOpen ? (
                    <Title order={5}>Debug: Character State</Title>
                ) : <Title order={6}>Debug</Title>}
                <ActionIcon variant="transparent" color="gray" onClick={(e) => {
                    // Impedisce la propagazione per non attivare il click del genitore
                    e.stopPropagation();
                    toggle();
                }}>
                    {isOpen ? <IconChevronDown size={18} /> : <IconChevronUp size={18} />}
                </ActionIcon>
            </Group>

            <Collapse in={isOpen}>
                <Code
                    block
                    mt="sm"
                    style={{
                        maxHeight: 'calc(80vh - 80px)',
                        overflowY: 'auto',
                        pointerEvents: 'auto', // Permette di selezionare il testo JSON
                    }}
                >
                    {JSON.stringify(builderState, null, 2)}
                </Code>
            </Collapse>
        </Paper>
    );
};