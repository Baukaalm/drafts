import useSWR from 'swr';
import flatMap from 'lodash/flatMap';
import { useSearchParams } from 'next/navigation';
import { useCategories } from '@/features/select-category/model/hooks';
import { fetcher } from '@/shared/api/fetcher';
import { useUser } from '@/shared/providers/user-provider/use-user';

export function useGameSections() {
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const { data, isLoading: isGamesLoading } = useSWR('/games', fetcher);
  const { user } = useUser();
  const searchParams = useSearchParams();
  const categoryParam =
    searchParams.get('category') && searchParams.get('category');
  const providerParam = searchParams.get('provider');
  const searchParam = searchParams.get('search');

  const isCategorySelected =
    searchParams.has('category') && categoryParam !== 'all';
  const isProviderSelected =
    searchParams.has('provider') && providerParam !== 'all';
  const isSearchTyped = searchParams.has('search');
  const isWishlist = searchParams.has('wishlist');

  const showCategories =
    !isCategorySelected && !isSearchTyped && !isProviderSelected && !isWishlist;

  if (isCategoriesLoading || isGamesLoading) {
    return {
      isSectionsLoading: true,
      sections: null,
    };
  }

  const categoriesWithGames = categories
    .map((category) => {
      const gamesInCategory = data.filter(
        (game) => game.categoryId === category.id
      );

      return {
        ...category,
        games: gamesInCategory,
      };
    })
    .reverse();

  const currentGames = flatMap(categoriesWithGames, 'games');

  const filteredGames = currentGames
    .filter((game) => !isCategorySelected || game.categoryId === categoryParam)
    .filter((game) => !isProviderSelected || game.providerId === providerParam)
    .filter(
      (game) =>
        !isSearchTyped ||
        game.title.toLowerCase().includes(searchParam.toLowerCase())
    )
    .filter((game) => !isWishlist || user.wishlist.includes(game.id));

  return {
    categoriesWithGames,
    showCategories,
    games: filteredGames,
    isSectionsLoading: false,
  };
}
