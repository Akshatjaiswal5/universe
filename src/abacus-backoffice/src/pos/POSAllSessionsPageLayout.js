// @flow

import Icon from '@adeira/icons';
import NextLink from 'next/link';
import { Entity, EntityField, LinkButton } from '@adeira/sx-design';
import React, { type Node } from 'react';
import fbt from 'fbt';

import LayoutPage from '../LayoutPage';

export default function POSAllSessionsPageLayout(): Node {
  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="all POS sessions page title">All POS Sessions</fbt>}
      description={
        <fbt desc="all POS sessions page description">
          Here you can find all active POS sessions.
        </fbt>
      }
    >
      <Entity>
        <EntityField
          title={<fbt desc="POS in Mexico City">Mexico City</fbt>}
          description="TNLA 346, Roma Sur"
        />
        <EntityField
          title={
            <LinkButton
              nextLinkComponent={NextLink}
              href="/pos/session"
              target="_blank"
              suffix={<Icon name="external" />}
            >
              <fbt desc="navigation link to point of sales">Open POS session</fbt>
            </LinkButton>
          }
        />
      </Entity>
    </LayoutPage>
  );
}
