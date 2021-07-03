// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Timeline(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 7.5h7M7.498 11.5h6.669M7.498 9.5H12.5M9.498 13.5H17.5" />
      </g>
    </svg>
  );
}
