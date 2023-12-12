'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { LogoAnimoji } from '@/components/core/logo-animoji/logo-animoji';
import { mdiMenu, mdiPlus } from '@/components/icons/mdi';
import { useHasMounted } from '@/hooks/use-has-mounted';
import cx from '@/utils/cx';

import { MobileMenuIcon, MobileMenuToggle } from './buttons/mobile-menu-toggle';
import { ThemeToggle } from './buttons/theme-toggle';
import { HomeLink, HomeLinkSpan } from './nav-links/link.styles';
import { ToolbarLinksContainer } from './nav-links/links-container.styles';
import { ToolbarNavLinks } from './nav-links/nav-links';
import { Header, Nav } from './toolbar.styles';

const scrollThreshold = 40; //px
export const Toolbar = () => {
  const pathname = usePathname();
  const [isExpanded, setExpanded] = useState(false);
  const [elevated, setElevated] = useState(false);
  const hasMounted = useHasMounted();

  const checkScrolledDistance = useCallback(() => {
    if (!hasMounted) return;
    const scrolledDistance = window.scrollY || window.pageYOffset;
    try {
      setElevated(scrolledDistance >= scrollThreshold);
    } catch (e) {}
  }, [hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;
    window.addEventListener('scroll', checkScrolledDistance);
    checkScrolledDistance();
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('scroll', checkScrolledDistance);
    };
  }, [hasMounted, checkScrolledDistance]);

  useEffect(() => {
    if (!hasMounted) return;
    if (isExpanded) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }, [isExpanded, hasMounted]);

  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  return (
    <Header data-expanded={isExpanded} id={'header'}>
      <Nav $elevated={elevated}>
        <HomeLink href={'/'} title={'Home page'} className={'group/animoji'}>
          <LogoAnimoji />
          <HomeLinkSpan
            className={cx(
              'tablet-sm:hidden tablet-sm:invisible',
              'tablet-sm:pointer-events-none tablet-sm:select-none',
            )}
          >
            Jahir Fiquitiva
          </HomeLinkSpan>
        </HomeLink>
        <ToolbarNavLinks pathname={pathname} />
        <ToolbarLinksContainer className={'self-start tablet-md:self-center'}>
          <li className={'self-start'}>
            <ThemeToggle />
          </li>
          <li className={'self-start'}>
            <MobileMenuToggle
              title={`${isExpanded ? 'Collapse' : 'Expand'} menu`}
              aria-expanded={isExpanded}
              aria-controls={'header'}
              onClick={() => {
                setExpanded(!isExpanded);
              }}
            >
              <MobileMenuIcon path={isExpanded ? mdiPlus : mdiMenu} size={1} />
            </MobileMenuToggle>
          </li>
        </ToolbarLinksContainer>
      </Nav>
    </Header>
  );
};
