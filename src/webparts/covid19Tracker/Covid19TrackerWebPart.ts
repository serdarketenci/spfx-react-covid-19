import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'Covid19TrackerWebPartStrings';
import Covid19Tracker from './components/Covid19Tracker';
import { ICovid19TrackerProps } from './components/ICovid19TrackerProps';
import { ICovidService, CovidService } from './services';
import { IItem } from './models';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';


export interface ICovid19TrackerWebPartProps {
  service: ICovidService;
  title: string;
  defaultCountry: string;
}

export default class Covid19TrackerWebPart extends BaseClientSideWebPart<ICovid19TrackerWebPartProps> {
  private _countries: string[];
  private service = new CovidService();
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  protected async onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();
    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
    // Initilize the PnP Client storage object

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<ICovid19TrackerProps> = React.createElement(
      Covid19Tracker,
      {
        title: this.properties.title,
        updateTitle: (value: string) => {
          this.properties.title = value;
        },
        displayMode: this.displayMode,
        themeVariant: this._themeVariant,
        defaultCountry: this.properties.defaultCountry ? this.properties.defaultCountry : "Turkey",
        service: this.service
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('defaultCountry', {
                  label: strings.CountryFieldLabel,
                  selectedKey: this.properties.defaultCountry,
                  options: this._getCountryDropDownOptions(),
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneConfigurationStart(): void {
    this.service.getAll().then((items: IItem[]) => {
      this._countries = items.map((item) => {
        return item.country
      }).sort();

      this.context.propertyPane.refresh();
    })
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'defaultCountry' &&
      newValue) {
      // push new list value
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    }
  }

  private _getCountryDropDownOptions = (): IPropertyPaneDropdownOption[] => {
    if (this._countries && this._countries.length > 0) {
      let options: IPropertyPaneDropdownOption[] =
        this._countries
          .sort()
          .map(country => {
            return {
              key: country,
              text: country,
            };
          });
      return options;
    }
  }
  /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

}
