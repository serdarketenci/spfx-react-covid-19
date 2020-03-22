# spfx-react-covid-19
## Summary
This webpart shows the number of COVID-19 cases recorded from different countries on a sharepoint site. It allows the users to select their personal choice of a particular country. And shows the information for the chosen country.

##  
![spfx-covid19](/assets/screen.gif) 

## Data Respository
This webpart used the data repository of the 2019 Novel Coronavirus Visual Dashboard operated by the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE).
The data is collected from WHO, Health Departments and other Government functions of different countries. More details and usage guidelines can be found on this repository - [https://github.com/CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19)

## How to use
- Download the latest app package file from the [Releases](https://github.com/RamPrasadMeenavalli/react-covid19-tracker/releases) section. 
- Add the .sppkg file to your App Catalog 
- Install the app in a SharePoint site.
- From the Webpart Toolbox search for Covid-19 Tracker webpart and add it to the page.

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)


## WebPart Properties
 
Property |Type|Default| Comments
--------------------|----|--------|----------
Default Country | Dropdown |  | The default country to be shown

## Minimal Path to Awesome

- Clone this repository
- Run the following in the command window:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
