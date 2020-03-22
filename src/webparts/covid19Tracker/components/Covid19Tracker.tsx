import * as React from 'react';
import styles from './Covid19Tracker.module.scss';
import { ICovid19TrackerProps } from './ICovid19TrackerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Item } from '../models';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import { PivotItem, IPivotItemProps, Pivot } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import BarChart from './chartContainer/BarChart';
import ResultContainer from './formContainer/ResultContainer';

export default function Covid19Tracker(props: ICovid19TrackerProps) {

  return (
    <div className={styles.covid19Tracker}>
        <WebPartTitle
          themeVariant = {props.themeVariant}
          displayMode={props.displayMode}
          title={props.title}
          updateProperty={props.updateTitle}
        />

      <Pivot aria-label="Covid-19 Tracker">
        <PivotItem headerText="Today" itemIcon="PageListFilter">
          <ResultContainer service={props.service} defaultCountry={props.defaultCountry} />
        </PivotItem>
        <PivotItem headerText="Chart" itemIcon="BarChartHorizontal">
          <BarChart service={props.service} />
        </PivotItem>
      </Pivot>
    </div>
  );
}
