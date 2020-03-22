import * as React from 'react';
import { ICovidService } from '../../../services/ICovidService';
import * as moment from 'moment';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import styles from './TotalResult.module.scss';
import { TotalResultItem, ITotalResultItem } from '../../../models';
import { Text } from 'office-ui-fabric-react/lib/Text';


export interface ITotalResultProps {
    service: ICovidService;
}

export default function TotalResult(props: ITotalResultProps) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [totalResult, setTotalResult] = React.useState(new TotalResultItem({
        cases: 0,
        deaths: 0,
        recovered: 0
    }));

    React.useEffect(() => {
        props.service.getTotal().then((totalResult: ITotalResultItem) => {
            setIsLoading(false);
            setTotalResult(totalResult);
        });
    }, []);

    var content = null;
    if (isLoading === true) content = <Spinner size={SpinnerSize.medium} />;
    else content = (
        <div>
            <Text className={styles.resultRow} block variant="mediumPlus">Cases: <span className={styles.resultValue}>{totalResult.cases}</span></Text>
            <Text className={styles.resultRow} block variant="mediumPlus">Recovered: <span className={styles.resultValue}>{totalResult.recovered}</span></Text>
            <Text className={styles.resultRow} block variant="mediumPlus">Deaths: <span className={styles.resultValue}>{totalResult.deaths}</span></Text>
        </div>
    );

    return (<div className={styles.totalResult}>
        <div className={styles.container}>
            <Text block variant="xLarge">Total Confirmed</Text>
            {content}
        </div>
    </div>);
}