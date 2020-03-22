import * as React from 'react';
import { ICovidService } from '../../../services/ICovidService';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import styles from './Result.module.scss';
import { IItem } from '../../../models';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface IResultProps {
    service: ICovidService;
    defaultCountry: string;
}

export default function Result(props: IResultProps) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [countries, setCountries] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        props.service.getAll().then((items: IItem[]) => {
            var countries = items.map((item) => {
                return item.country
            }).sort();

            setItems(items);
            setCountries(countries.map(country => {
                return {
                    key: country,
                    text: country,
                };
            }));

            var currentItem = items.filter((i) => {
                return i.country == props.defaultCountry
            });
            setSelectedItem(currentItem[0]);
            setIsLoading(false);
        });
    }, []);


    const _onChangeCountry = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        var currentItem = items.filter((i) => {
            return i.country == item.text
        });
        setSelectedItem(currentItem[0]);
    };

    var content = null;
    if (isLoading === true) content = <Spinner size={SpinnerSize.large} />;
    else content = (
        <div>
            <Dropdown placeholder="Select a country" label="Country"
                defaultSelectedKey={props.defaultCountry}
                options={countries}
                className={styles.countrySelect}
                onChange={_onChangeCountry}
            />
            {selectedItem &&
                <div>
                    <Text className={styles.resultRow} block variant="mediumPlus">Cases: <span className={styles.resultValue}>{selectedItem.cases}</span></Text>
                    <Text className={styles.resultRow} block variant="mediumPlus">Recovered: <span className={styles.resultValue}>{selectedItem.recovered}</span></Text>
                    <Text className={styles.resultRow} block variant="mediumPlus">Deaths: <span className={styles.resultValue}>{selectedItem.deaths}</span></Text>
                </div>
            }
        </div>
    );

    return (<div className={styles.result}>
        <div className={styles.container}>
            {content}
        </div>


    </div>);
}