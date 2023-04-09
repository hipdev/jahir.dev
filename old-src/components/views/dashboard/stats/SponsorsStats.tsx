import { LinkStatCard, StatCard } from '@/old/components/compounds';
import { money, mdiHeartOutline } from '@/old/components/icons';
import { useSponsors } from '@/old/providers/sponsors';
import type { FC } from '@/old/types';

interface SponsorsStatsProps {
  forSponsorsPage?: boolean;
}

export const SponsorsStats: FC<SponsorsStatsProps> = (props) => {
  const { sponsorsCount, totalEarningsPerMonth, loading } = useSponsors();
  const MoneyCard = props.forSponsorsPage ? StatCard : LinkStatCard;
  return (
    <>
      <LinkStatCard
        title={'View sponsors'}
        href={`${props.forSponsorsPage ? '' : '/donate'}#thanks`}
        text={'sponsors'}
        value={`${sponsorsCount || '?'}`}
        iconPath={mdiHeartOutline}
        color={'#c94091'}
        loading={loading}
      />
      <MoneyCard
        title={'View sponsors'}
        href={'/donate'}
        text={'earned per month'}
        value={`$${totalEarningsPerMonth || 0}`}
        iconPath={money}
        color={'#26de81'}
        loading={loading}
      />
    </>
  );
};
