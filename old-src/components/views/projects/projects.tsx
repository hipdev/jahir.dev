import Icon from '@mdi/react';
import { useMemo, useState } from 'react';

import { Masonry, type MasonryBreakpoints } from '@/old/components/compounds';
import { NothingFound } from '@/old/components/compounds/list-cards-group/list-cards-group.styles';
import { Field, Heading, Section, LinkButton } from '@/old/components/core';
import {
  mdiEyeOutline,
  mdiFileCodeOutline,
  mdiMagnify,
} from '@/old/components/icons';
import { breakpointsValues } from '@/old/stitches';
import type { FC, Project } from '@/old/types';
import { theme } from '~/stitches';

import { ProjectCard } from './card';
import { ProjectsButtons, ProjectsHeader } from './projects.styled';

interface ProjectsProps {
  projects?: Array<Project>;
  showFullList?: boolean;
}

const masonryBreakpoints: MasonryBreakpoints = {};
masonryBreakpoints['0'] = 1;
masonryBreakpoints[(breakpointsValues['mobile-sm'] || 0).toString()] = 1;
masonryBreakpoints[(breakpointsValues['tablet-sm'] || 0).toString()] = 2;

// eslint-disable-next-line max-lines-per-function
export const Projects: FC<ProjectsProps> = (props) => {
  const { projects, showFullList } = props;
  const [search, setSearch] = useState('');

  const filteredProjects = useMemo(() => {
    return projects?.filter(
      (project) =>
        project?.name.toLowerCase().includes(search.toLowerCase()) ||
        project?.description?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [projects, search]);

  const renderSearchComponents = () => {
    if (!showFullList) return null;
    return (
      <>
        <Field
          iconPath={mdiMagnify}
          type={'text'}
          name={'search-input'}
          label={'Search projects'}
          placeholder={'Search projects...'}
          value={search}
          onChange={setSearch}
          hideLabel
        />

        {(filteredProjects?.length || 0) <= 0 ? (
          <NothingFound>No projects found.</NothingFound>
        ) : null}
      </>
    );
  };

  return (
    <Section
      id={'projects'}
      css={{ gap: 'calc($$verticalContentPadding / 1.5)' }}
    >
      <ProjectsHeader>
        <Heading shadow={'red'} gradient={'red-to-purple'}>
          {!showFullList ? 'Featured ' : ''}Projects
        </Heading>
        <ProjectsButtons>
          <LinkButton
            title={"Jahir's resume pdf file"}
            href={'/resume'}
            openInNewTab
            outlined
          >
            <Icon path={mdiFileCodeOutline} size={0.9} />
            Resume
          </LinkButton>
          {!showFullList && (
            <LinkButton
              title={'View all projects by Jahir'}
              href={'/projects'}
              withShadow
            >
              <Icon path={mdiEyeOutline} size={0.9} />
              View all
            </LinkButton>
          )}
        </ProjectsButtons>
      </ProjectsHeader>
      {renderSearchComponents()}
      <Masonry breakpoints={masonryBreakpoints} gap={theme.space['18'].value}>
        {(filteredProjects || []).map((project, index) => {
          return (
            <ProjectCard
              key={
                // eslint-disable-next-line newline-per-chained-call
                `${project.name.toLowerCase().split(' ').join('-')}-${index}`
              }
              project={project}
            />
          );
        })}
      </Masonry>
    </Section>
  );
};
