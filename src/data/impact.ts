// ---------------------------------------------------------------------------
// Impact & statistics.
//
// CRITICAL RULE: Never display invented numbers. `statistics` is empty until
// values are verified. `reportAreas` describes the categories the company may
// report against once real data exists — shown as "reporting areas", not
// achievements. `metricRegistry` lists the KPI labels that will become
// countable once verified data is available.
// ---------------------------------------------------------------------------

import type { Statistic } from './types';

export interface ReportArea {
  title: string;
  description: string;
}

export const statistics: Statistic[] = [];

export const reportAreas: ReportArea[] = [
  {
    title: 'Food Production',
    description: 'Output, volumes, and yields under management.',
  },
  {
    title: 'Employment & Livelihoods',
    description: 'Workforce created and livelihoods supported.',
  },
  {
    title: 'Communities Served',
    description: 'The communities and markets our operations reach.',
  },
  {
    title: 'Responsible Practice',
    description: 'Ongoing, measurable responsibility toward land and people.',
  },
];

export interface ReportMetric {
  label: string;
  definition?: string;
}

export const metricRegistry: ReportMetric[] = [
  {
    label: 'Hectares under cultivation',
    definition: 'Confirmed area actively cultivated by the operation.',
  },
  {
    label: 'Annual production volume',
    definition: 'Verified annual output across a full season.',
  },
  {
    label: 'Years of operation',
    definition: 'Verified length of the company\'s operating history.',
  },
  {
    label: 'People employed',
    definition: 'The confirmed workforce.',
  },
  {
    label: 'Operating locations',
    definition: 'Verified sites and facilities.',
  },
  {
    label: 'Partners supported',
    definition: 'Verified value-chain and partner relationships.',
  },
];