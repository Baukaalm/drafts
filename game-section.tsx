import React from 'react';
import { useRouter } from 'next/navigation';
import { Game, GameItem } from '@/entities/game/ui/Game';
import { Section, SectionBlocks, SectionBlock, SectionViewAll } from './styles';
import { Image } from '@/shared/ui/image';
import { BoldHeadingQuinary } from '@/shared/ui/typography';
import { useI18n } from 'locales/client';
import { WishlistToggle } from '@/features/wishlist/ui/wishlist-toggle';

interface Props {
    games?: GameItem[];
    mobileLandscape?: boolean;
    title: string;
  }

export const GameSection = (props: Props) => {
  const { games, title } = props;
  const t = useI18n();
  const router = useRouter();

  return (
    <>
      {
        <SectionBlocks>
          <SectionBlock>
            <BoldHeadingQuinary>
              {t(`ui.main.filter.category.${title}`)}{' '}
              <BoldHeadingQuinary color="#8a99bd" display="inline-block">
                {games.length}
              </BoldHeadingQuinary>
            </BoldHeadingQuinary>
          </SectionBlock>
          <SectionBlock>
            <SectionViewAll
              onClick={() => {
                router.push(`/?category=${title}`);
              }}
            >
              {t('ui.main.filter.view_all')}{' '}
              <Image
                width={16}
                height={16}
                src="images/icons/arrow-right.svg"
                alt="button"
              />
            </SectionViewAll>
          </SectionBlock>
        </SectionBlocks>
      }
      <Section>
        {games.slice(0, 14).map((game) => (
          <div key={game.id} onClick={() => props.onGameClick(game)}>
            <Game
              wishlistToggleSlot={
                <WishlistToggle gameId={game.id} title={game.title} />
              }
              imageUrl={game.ImageUrl}
              {...game}
            />
          </div>
        ))}
      </Section>
    </>
  );
};
