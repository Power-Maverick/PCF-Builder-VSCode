[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/danish-naglekar.pcf-builder)](https://marketplace.visualstudio.com/items?itemName=danish-naglekar.pcf-builder)
[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/danish-naglekar.pcf-builder?label=vscode%20marketplace)](https://marketplace.visualstudio.com/items?itemName=danish-naglekar.pcf-builder)
[![GitHub stars](https://img.shields.io/github/stars/Power-Maverick/PCF-Builder-VSCode?label=github%20stars)](https://github.com/Power-Maverick/PCF-Builder-VSCode)
[![License](https://img.shields.io/github/license/Power-Maverick/PCF-Builder-VSCode)](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/Power-Maverick/PCF-Builder-VSCode)](https://gitter.im/PCF-Builder/community)

[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub)](https://github.com/sponsors/Power-Maverick)

[![Twitter Follow](https://img.shields.io/twitter/follow/DanzMaverick?style=social)](https://twitter.com/Danzmaverick)

# PCF Builder

Build your Power Apps Component Framework custom controls faster. No need to rememeber the PCF CLI commands. All commands provided in one selection list for you to execute.

## Usage

View list of commands via `Ctrl+Shift+P` and type **PCF Builder**

## Requirements

Requires [npm](https://nodejs.org/en/) and [PCF CLI](https://aka.ms/PowerAppsCLI)

## List of all available commands

![AllCommands](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/AllCommands.png?raw=true)

## Features

### Commands

1. Initialize PCF control

    ![Init-IDE](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/Initialize-Control.gif?raw=true)

2. Build & Test PCF control
  
   ![Build-IDE](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/Build-Control.gif?raw=true)

3. Manage Authentication Profiles
  
   ![Auth-Profiles-IDE](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/Manage-Auth-Profiles.gif?raw=true)

4. Update PCF CLI
  
   ![Update-CLI-IDE](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/Update-PCF-CLI.gif?raw=true)

5. Quick Deploy using PCF Push
  
   ![PCF-Push-IDE](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/PCF-Push.gif?raw=true)

6. Force Mode, Adding Resx file
  
   ![PCF-Force](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/PCF-Generator-Integration.gif?raw=true)

### Intellisense

#### Manifest file

Invoke it by pressing `Ctrl+Space`

![ManifestFile-Intellisense](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/ManifestFileIntellisense.gif?raw=true)

### Keyboard Shortcuts

| Command | Keyboard Shortcut |
| ------- | ----------------- |
| Initialize PCF project | `Ctrl + P, Ctrl + I` |
| Build PCF project | `Ctrl + P, Ctrl + B` |
| Test with watch | `Ctrl + P, Ctrl + T` |
| Update PCF CLI | `Ctrl + P, Ctrl + U` |
| PCF Quick Push | `Ctrl + P, Ctrl + Q` |
| Invoke Force Mode | `Ctrl + P, Ctrl + F` |
| Add additional RESX file | `Ctrl + P, Ctrl + R` |

## Contributing

Found a bug? or have a feature request? - Create a pull request or an issue on [GitHub](https://github.com/Power-Maverick/PCF-Builder-VSCode)

## License

This software is released under [MIT License](http://www.opensource.org/licenses/mit-license.php)

## Release Notes

### 1.0.5

- Features
  - Force mode added to kickstart your complete PCF & CDS projects
  - Ability to add additional RESX files using context menu
  - Keyboard shortcuts added to important menthods
  
- Other Notes
  - Files re-ordered and code refactored

### 1.0.4

- Features
  - Intellisense available for Manifest file

### 1.0.3

- Features
  - Added optional step that allows you to pick additional libraries to be installed during the initialization process.
    - Options to pick:
      1. React
      2. React + Fluent UI
      3. None (or press escape)

- Bugs Fixed
  - Command "*Show Current Authentication Profile*" was throwing error.
  - Opening of mutiple terminals on different commands is resolved.

- Other Notes
  - Refactored code for better usability

### 1.0.2

- Initial release of PCF Builder

-------------------------------------------------------------------------------------------

**Enjoy!**
