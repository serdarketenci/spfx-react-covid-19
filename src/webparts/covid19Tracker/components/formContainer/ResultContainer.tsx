import * as React from 'react';
import { ICovidService } from '../../services/ICovidService';
import styles from './ResultContainer.module.scss';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import TotalResult from './totalResult/TotalResult';
import Result from './result/Result';


export interface IResultContainerProps {
    service: ICovidService;
    defaultCountry: string;
}

export default function ResultContainer(props: IResultContainerProps) {
    return (<div className={styles.resultContainer}>
        <div className={styles.container}>
            <TotalResult service={props.service} />
            <Separator></Separator>
            <Result service={props.service} defaultCountry={props.defaultCountry} />
        </div>
    </div>);
}