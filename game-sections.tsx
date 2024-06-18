'use client';
import { useState } from 'react';
import { useGameSections } from '@/entities/game/model/hooks';
import { Wrapper, NotFound, NotFoundTitle } from './styles';
import { GameSection } from '@/widgets/game-section';
import { Game } from '@/entities/game/ui/Game';
import { GameDetail } from '@/entities/game/ui/GameDetail';
import {
  Section,
  SectionBlock,
  SectionBlocks,
} from '@/widgets/game-section/ui/styles';
import { Image } from '@/shared/ui/image';
import { withBreakpointsSlice } from '@/shared/providers/utils/with-breakpoints-slice';
import { SkeletonLoader } from '@/shared/ui/skeleton';
import { BoldHeadingQuinary } from '@/shared/ui/typography';
import { WishlistToggle } from '@/features/wishlist/ui/wishlist-toggle';

const GameSections = ({ mobileLandscape }) => {
  const { categoriesWithGames, showCategories, games, isSectionsLoading } =
    useGameSections();
  const [currentGame, setCurrentGame] = useState(null);

  if (showCategories) {
    return (
      <Wrapper>
        {categoriesWithGames.map((section) => (
          <GameSection
            key={section.id}
            title={section.id}
            games={section.games}
            onGameClick={setCurrentGame}
          />
        ))}
        {mobileLandscape && (
          <GameDetail
            wishlistToggleSlot={
              <WishlistToggle
                gameId={currentGame && currentGame.id}
                title={currentGame && currentGame.title}
              />
            }
            game={currentGame}
            onClose={() => setCurrentGame(null)}
          />
        )}
      </Wrapper>
    );
  }

  if (!showCategories && games.length === 0) {
    return (
      <Wrapper>
        {
          <NotFound>
            <NotFoundTitle>Nothing found</NotFoundTitle>
            <Image
              alt="not fount"
              src="/images/not-found.png"
              width={240}
              height={220}
            />
          </NotFound>
        }
      </Wrapper>
    );
  }
  if (!showCategories) {
    return (
      <Wrapper>
        <Section>
          {games.map((game) => (
            <div key={game.id} onClick={() => setCurrentGame(game)}>
              <Game
                wishlistToggleSlot={
                  <WishlistToggle gameId={game.id} title={game.title} />
                }
                imageUrl={game.ImageUrl}
                {...game}
              />
            </div>
          ))}
          {mobileLandscape && (
            <GameDetail
              game={currentGame}
              wishlistToggleSlot={
                <WishlistToggle
                  gameId={currentGame && currentGame.id}
                  title={currentGame && currentGame.title}
                />
              }
              onClose={() => setCurrentGame(null)}
            />
          )}
        </Section>
      </Wrapper>
    );
  }

  return null;
};

const GameSectionsWithBreakpointsSlice = withBreakpointsSlice(
  GameSections,
  ({ mobileLandscape }) => ({ mobileLandscape })
);
export { GameSectionsWithBreakpointsSlice as GameSections };
