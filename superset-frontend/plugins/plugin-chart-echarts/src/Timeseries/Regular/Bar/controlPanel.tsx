/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { t } from '@superset-ui/core';
import {
  ControlPanelConfig,
  ControlSubSectionHeader,
  getStandardizedControls,
  sections,
} from '@superset-ui/chart-controls';
import {
  legendSection,
  minorTicks,
  richTooltipSection,
  seriesOrderSection,
  showValueSection,
  truncateXAxis,
  xAxisBounds,
} from '../../../controls';

import { OrientationType } from '../../types';
import { DEFAULT_FORM_DATA } from '../../constants';

import { createAxisTitleControl, createAxisControl } from '../../controls';

const { zoomable, orientation } = DEFAULT_FORM_DATA;

const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.echartsTimeSeriesQueryWithXAxisSort,
    sections.advancedAnalyticsControls,
    sections.annotationsAndLayersControls,
    sections.forecastIntervalControls,
    {
      label: t('Chart Orientation'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'orientation',
            config: {
              type: 'RadioButtonControl',
              renderTrigger: true,
              label: t('Bar orientation'),
              default: orientation,
              options: [
                [OrientationType.Vertical, t('Vertical')],
                [OrientationType.Horizontal, t('Horizontal')],
              ],
              description: t('Orientation of bar chart'),
            },
          },
        ],
      ],
    },
    {
      label: t('Chart Title'),
      tabOverride: 'customize',
      expanded: true,
      controlSetRows: [
        [<ControlSubSectionHeader>{t('X Axis')}</ControlSubSectionHeader>],
        ...createAxisTitleControl('x'),
        [<ControlSubSectionHeader>{t('Y Axis')}</ControlSubSectionHeader>],
        ...createAxisTitleControl('y'),
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ...seriesOrderSection,
        ['color_scheme'],
        ['time_shift_color'],
        ...showValueSection,
        [minorTicks],
        [
          {
            name: 'zoomable',
            config: {
              type: 'CheckboxControl',
              label: t('Data Zoom'),
              default: zoomable,
              renderTrigger: true,
              description: t('Enable data zooming controls'),
            },
          },
        ],
        ...legendSection,
        [<ControlSubSectionHeader>{t('X Axis')}</ControlSubSectionHeader>],
        ...createAxisControl('x'),
        [truncateXAxis],
        [xAxisBounds],
        ...richTooltipSection,
        [<ControlSubSectionHeader>{t('Y Axis')}</ControlSubSectionHeader>],
        ...createAxisControl('y'),
      ],
    },
  ],
  formDataOverrides: formData => ({
    ...formData,
    metrics: getStandardizedControls().popAllMetrics(),
    groupby: getStandardizedControls().popAllColumns(),
  }),
};

export default config;
