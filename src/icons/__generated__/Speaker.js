/**
 * This file is automatically GENERATED.
 * Manual changes might be lost - proceed with caution!
 *
 * @flow strict
 */

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Speaker(props: Props): Element<'svg'> {
  return (
    <svg
      height="1em"
      viewBox="0 0 21 21"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      {...props}
    >
      <g fill="none" fillRule="evenodd" transform="translate(5 3)">
        <path
          d="M2.5.5h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={5.5}
          cy={9.5}
          r={3}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={5.5} cy={3.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
