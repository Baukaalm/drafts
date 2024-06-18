import React, { useState } from 'react';
import { withBreakpointsSlice } from '@/shared/providers/utils/with-breakpoints-slice';
import {
  Section,
  ImageContainer,
  SectionButton,
  SectionDescription,
  SectionTitle,
  SectionContent,
  ImageElement,
  ImageTemplate,
} from './styles';
import { Image } from '@/shared/ui/image';
import { shimmer, toBase64 } from '../utils';
import { useI18n } from 'locales/client';
import { Box } from '@/shared/ui/box';
import { BodyTextBoldSecondary } from '@/shared/ui/typography';
import { useRouter } from 'next/navigation';
interface Props {
  imageUrl?: string;
  mobileLandscape?: boolean;
  title: string;
  providerName: string;
  wishlistToggleSlot: React.ReactNode;
}

const Game = (props: Props) => {
  const { imageUrl, status, wishlistToggleSlot, id, minBet } = props;
  const router = useRouter();
  const t = useI18n();
  return (
    <>
      <Section $status={status}>
        <SectionContent>
          <SectionTitle>{props.title} </SectionTitle>
          <SectionDescription>{props.providerName} </SectionDescription>
          <SectionButton
            onClick={() => router.push(`/game/${id}?minBet=${minBet}`)}
          >
            <Image width={16} height={16} src="images/icons/play.svg" />
            {t('ui.main.game_card.play')}
          </SectionButton>
          <Box $position="absolute" $bottom={16} $width="100%">
            <Box
              $display="flex"
              $justifyContent="space-between"
              $alignItems="center"
              $paddingRight={12}
              $paddingLeft={12}
            >
              <BodyTextBoldSecondary
                onClick={() =>
                  router.push(`/game/${id}?demo=true&minBet=${minBet}`)
                }
              >
                {t('ui.main.game_card.demo')}
              </BodyTextBoldSecondary>
              <Box>{wishlistToggleSlot}</Box>
            </Box>
          </Box>
        </SectionContent>
        <ImageContainer>
          <ImageElement
            $status={status}
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            alt="game"
            fill
            sizes="(max-width: 768px) 106px, 150px"
            src={imageUrl}
            blurDataURL="data:image/jpeg..."
          />
          <ImageTemplate $status={status}>{status}</ImageTemplate>
        </ImageContainer>
      </Section>
    </>
  );
};

const GameWithBreakpointsSlice = withBreakpointsSlice(
  Game,
  ({ mobileLandscape }) => ({
    mobileLandscape,
  })
);

export { GameWithBreakpointsSlice as Game };
