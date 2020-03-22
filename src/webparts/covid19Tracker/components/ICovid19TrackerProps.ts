import { ICovidService } from "../services";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface ICovid19TrackerProps {
  updateTitle: (value: string) => void;
  themeVariant: IReadonlyTheme;
  displayMode: DisplayMode;

  service: ICovidService;
  title: string;
  defaultCountry: string;
}
