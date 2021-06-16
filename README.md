[![Build](https://github.com/Power-Maverick/PCF-Builder-VSCode/workflows/Build/badge.svg?branch=master)](https://github.com/Power-Maverick/PCF-Builder-VSCode/actions?query=workflow%3ABuild)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/danish-naglekar.pcf-builder)](https://marketplace.visualstudio.com/items?itemName=danish-naglekar.pcf-builder)
[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/danish-naglekar.pcf-builder?label=vscode%20marketplace)](https://marketplace.visualstudio.com/items?itemName=danish-naglekar.pcf-builder)
[![GitHub stars](https://img.shields.io/github/stars/Power-Maverick/PCF-Builder-VSCode?label=github%20stars)](https://github.com/Power-Maverick/PCF-Builder-VSCode)
[![License](https://img.shields.io/github/license/Power-Maverick/PCF-Builder-VSCode)](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/Power-Maverick/PCF-Builder-VSCode)](https://gitter.im/PCF-Builder/community)

[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub)](https://github.com/sponsors/Power-Maverick)

[![Twitter Follow](https://img.shields.io/twitter/follow/DanzMaverick?style=social)](https://twitter.com/Danzmaverick)

# PCF Builder

Build your Power Apps Component Framework custom controls faster. No need to rememeber the PCF CLI commands. All commands provided in one selection list for you to execute.

**Table of contents**

- [PCF Builder](#pcf-builder)
  - [Usage](#usage)
  - [Requirements](#requirements)
  - [List of all available commands](#list-of-all-available-commands)
  - [Features](#features)
    - [Commands](#commands)
    - [Intellisense](#intellisense)
      - [Manifest file](#manifest-file)
    - [Play Mode](#play-mode)
    - [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Contributing & Discussions](#contributing--discussions)
  - [License](#license)
  - [Release Notes](#release-notes)
    - [1.1.2](#112)

## Usage

View list of commands via `Ctrl+Shift+P` and type **PCF Builder**

## Requirements

You need to have the following prerequisites on your machine:

1. [npm](https://nodejs.org/en/)
2. [PCF CLI](https://aka.ms/PowerAppsCLI)
3. [PCF Generator](https://www.npmjs.com/package/generator-pcf)

## List of all available commands

| Command                             | Description                                                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Initialize Component (Simple)       | Creates PCF project with basic folder structure. _Less questions asked_.                             |
| Initialize Component (Advanced)     | Creates PCF project with recommended folder structure.                                               |
| Build Component                     | Builds the code component.                                                                           |
| Test Component with Watch           | Launches Test Harness with ability to code while testing.                                            |
| Test Component with No Watch        | Launches Test Harness but does not re-renderwhen code changes.                                       |
| Preview Component                   | Loads the Test Harness inside VS Code with full functionality (_except does not do live watch_)      |
| Update PCF CLI                      | Upgrades PCF CLI on the current machine.                                                             |
| Create Authentication Profile       | Creates a new profile by authenticating with a particular CDS environment.                           |
| List Authentication Profile         | Shows list pf profiles that are authenticated with CDS environments for current machine.             |
| Delete Authentication Profile       | Deletes a specific profile from the current machine.                                                 |
| Switch Authentication Profile       | Changes the default profile connected to CDS environment.                                            |
| Show Current Authentication Profile | List the currently selected profile connected to CDS environment.                                    |
| Quick PCF Push                      | Pushes the code component to CDS environment based on currently selected profile.                    |
| Add new RESX File                   | Creates a new localization file under _strings_ folder and adds a reference in ControlManifest file. |
| Add GitHub Action                   | Creates a `.yml` file that will build and create CDS solution package under **Releases** on GitHub.  |
| Generate ReadMe file                | Creates a preety ReadMe file by parsing the ControlManifst file.                                     |
| Open Developer Tool                 | Open dev tools inside VS Code that lets you tinker the code component like you do in browser.        |

## Features

### Commands

1. Initialize PCF control

    ![Init-IDE](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/Initialize-Control.gif?raw=true)

2. Build & Test PCF control

    ![Build-IDE](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/Build-Control.gif?raw=true)

3. Preview PCF control

    ![Preview-IDE](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/Preview-Control.gif?raw=true)

4. Manage Authentication Profiles

    ![Auth-Profiles-IDE](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/Manage-Auth-Profiles.gif?raw=true)

5. Update PCF CLI

    ![Update-CLI-IDE](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/Update-PCF-CLI.gif?raw=true)

6. Quick Deploy using PCF Push

    ![PCF-Push-IDE](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/PCF-Push.gif?raw=true)

7. Advanced Mode and Adding Resx file

    ![PCF-Force](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/PCF-Generator-Integration.gif?raw=true)

### Intellisense

#### Manifest file

Invoke it by pressing `Ctrl + Space`

![ManifestFile-Intellisense](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/ManifestFileIntellisense.gif?raw=true)

### Play Mode

![Play-Preview](https://github.com/Power-Maverick/PCF-Builder-VSCode/blob/master/assets/Play-Mode.gif?raw=true)

### Keyboard Shortcuts

| Command                  | Keyboard Shortcut    |
| ------------------------ | -------------------- |
| Initialize PCF project   | `Ctrl + P, Ctrl + I` |
| Build PCF project        | `Ctrl + P, Ctrl + B` |
| Test with watch          | `Ctrl + P, Ctrl + T` |
| Preview component        | `Ctrl + P, F5`       |
| Update PCF CLI           | `Ctrl + P, Ctrl + U` |
| PCF Quick Push           | `Ctrl + P, Ctrl + Q` |
| Invoke Force Mode        | `Ctrl + P, Ctrl + F` |
| Add additional RESX file | `Ctrl + P, Ctrl + R` |

## Contributing & Discussions

Found a bug? or have a feature request? - Create a pull request or an issue on [GitHub](https://github.com/Power-Maverick/PCF-Builder-VSCode)
If you want to have any discussions on any feature, please use the [Discussion Board](https://github.com/Power-Maverick/PCF-Builder-VSCode/discussions)

## License

This software is released under [MIT License](http://www.opensource.org/licenses/mit-license.php)

## Release Notes

Latest release contains following items:

### 1.1.2

-   Features
    -   Added a new command "_Preview Component_" that will show Test Harness inside of VS Code
    -   New toolbar added that lets you play the preview command from any document along with ability to open DevTools

Previous release notes are documented [here](ReleaseNotes.md).
