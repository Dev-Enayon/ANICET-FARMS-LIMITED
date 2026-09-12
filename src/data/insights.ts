// ---------------------------------------------------------------------------
// Insights / news.
//
// CRITICAL RULE: Do not create fake company news. `insights` stays empty until
// real articles exist. `topics` lists only the categories the site intends to
// publish under.
// ---------------------------------------------------------------------------

import type { Insight } from './types';

export const insights: Insight[] = [];

export const topics: string[] = [
  'Agriculture',
  'Food production',
  'Market insights',
  'Company news',
];