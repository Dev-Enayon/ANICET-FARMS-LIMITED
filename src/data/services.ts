// ---------------------------------------------------------------------------
// Capabilities & value chain.
//
// CRITICAL RULE: The exact activities of ANICET FARMS LIMITED are not yet
// verified. `capabilities` is intentionally empty — populate it ONLY with
// confirmed activities. Each value-chain stage is marked `unconfirmed` until
// verified and is rendered as a framework placeholder (never as fact).
// ---------------------------------------------------------------------------

import type { Capability, ValueChainStage } from './types';

// TODO: Populate only when ANICET FARMS LIMITED confirms its activities.
export const capabilities: Capability[] = [];

export const valueChain: ValueChainStage[] = [
  {
    id: 'input',
    label: 'Source & Input',
    description: 'The stage at which inputs are sourced and secured.',
    status: 'unconfirmed',
  },
  {
    id: 'production',
    label: 'Production',
    description: 'The stage at which products are cultivated or developed.',
    status: 'unconfirmed',
  },
  {
    id: 'processing',
    label: 'Processing',
    description: 'The stage at which raw product is prepared for market.',
    status: 'unconfirmed',
  },
  {
    id: 'quality',
    label: 'Quality Control',
    description: 'The stage at which consistency and standards are verified.',
    status: 'unconfirmed',
  },
  {
    id: 'distribution',
    label: 'Distribution',
    description: 'The stage at which product is moved toward its market.',
    status: 'unconfirmed',
  },
  {
    id: 'market',
    label: 'Market',
    description: 'The stage at which product reaches customers and partners.',
    status: 'unconfirmed',
  },
];

// Neutral framing copy shown above the chain diagram until stages are verified.
export const valueChainNote =
  'The framework below reflects the stages a modern agricultural business typically operates across. Each stage is shown as a placeholder until ANICET FARMS LIMITED confirms its verified operations — confirmed stages will be activated, and inapplicable stages removed.';