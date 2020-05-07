![VS Marketplace Installs](https://vsmarketplacebadge.apphb.com/installs/danish-naglekar.pcf-builder.svg)
![VS Marketplace Version](https://vsmarketplacebadge.apphb.com/version-short/danish-naglekar.pcf-builder.svg)
![License](https://img.shields.io/github/license/Power-Maverick/PCF-Builder-VSCode)

# PCF Builder

Build your Power Apps Component Framework custom controls faster. No need to rememeber the PCF CLI commands. All commands provided in one selection list for you to execute.

## Usage

View list of commands via `Ctrl+Shift+P` and type **PCF Builder**

## Requirements

Requires [npm](https://nodejs.org/en/) and [PCF CLI](https://aka.ms/PowerAppsCLI)

## List of all available commands

![AllCommands](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/AllCommands.png?raw=true)

## Features

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

## Contributing

Found a bug? or have a feature request? - Create a pull request or an issue on [GitHub](https://github.com/Power-Maverick/PCF-Builder-VSCode)

## License

This software is released under [MIT License](http://www.opensource.org/licenses/mit-license.php)

## Release Notes

### 1.0.3

- Features
  - Added optional step that allows you to pick additional libraries to be installed during the initialization process.
    - Options to pick:
      1. React
      2. React + Fluent UI
      3. None (or press escape)

- Bugs Fixed
  - Command "Show Current Authentication Profile" was throwing error.
  - Opening of mutiple terminals on different commands is resolved.

- Other Notes
  - Refactored code for better usability

### 1.0.2

- Initial release of PCF Builder

-------------------------------------------------------------------------------------------

**Enjoy!**
