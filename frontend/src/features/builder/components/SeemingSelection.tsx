import { useEffect } from 'react';
import { Box, Text, Card, Image, Title, Blockquote, Stack, List } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { setSeeming } from '../stores/seemingSlice';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { seemingData } from '../data/seemingData'; // Importa i dati dal nuovo file

export const SeemingSelection = () => {
    const dispatch = useAppDispatch();
    const currentSeeming = useAppSelector((state) => state.builder.seeming.selected);

    useEffect(() => {
        if (!currentSeeming && seemingData.length > 0) {
            dispatch(setSeeming(seemingData[0].value));
        }
    }, [dispatch, currentSeeming]);

    const handleCarouselChange = (index: number) => {
        const newSeeming = seemingData[index].value;
        dispatch(setSeeming(newSeeming));
    };

    const initialSlideIndex = currentSeeming ? seemingData.findIndex(s => s.value === currentSeeming) : 0;

    const slides = seemingData.map((seeming) => (
        <Carousel.Slide key={seeming.value}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                <Card.Section>
                    <Image src={seeming.image} height={180} alt={seeming.label} />
                </Card.Section>

                <Stack mt="md" gap="sm">
                    <Title order={3} ta="center">{seeming.label}</Title>
                    <Blockquote fz="sm" ta="center" mt={0} p={0}>{seeming.quote}</Blockquote>
                    <Text size="sm" c="dimmed">{seeming.description}</Text>

                    <List size="sm" spacing="xs" withPadding>
                        <List.Item><b>Bonus:</b> {seeming.bonus}</List.Item>
                        <List.Item><b>Benedizione:</b> {seeming.blessing}</List.Item>
                        <List.Item><b>Maledizione:</b> {seeming.curse}</List.Item>
                    </List>
                </Stack>
            </Card>
        </Carousel.Slide>
    ));

    return (
        <Box p="md">
            <Title order={2} ta="center" mb="md">5. Select your Seeming</Title>

            <Carousel
                key={initialSlideIndex}
                slideSize="100%"
                slideGap="md"
                withControls
                withIndicators
                onSlideChange={handleCarouselChange}
                initialSlide={initialSlideIndex}
                emblaOptions={{
        loop: true,
        dragFree: false,
        align: 'center'
      }}
            >
                {slides}
            </Carousel>
        </Box>
    );
};
