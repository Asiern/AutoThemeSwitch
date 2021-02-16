"use strict";
import * as vscode from "vscode";

//Get User config
const userConfig = vscode.workspace.getConfiguration();
let config;
let light: any, dark: any;
let darkCustomizations: any, lightCustomizations: any;
let lightTime: number, darkTime: number;

function updateSettings() {
  config = vscode.workspace.getConfiguration("AutoThemeSwitch");
  //Dark Theme
  dark = config.dark;
  darkCustomizations = config.darkCustomizations;
  //Light Theme
  light = config.light;
  lightCustomizations = config.lightCustomizations;
  //Time
  darkTime = config.darkTime; //Start of darkTime
  lightTime = config.lightTime; //Start lightTime
}

export function activate(context: vscode.ExtensionContext) {
  let themeKey = "workbench.colorTheme";
  updateSettings();
  let time = new Date();
  const hours = time.getHours();

  if (lightTime < hours && hours >= darkTime) {
    //Set Dark Theme
    userConfig.update(themeKey, dark, true);
    userConfig.update(
      "workbench.colorCustomizations",
      darkCustomizations,
      true
    );
  } else {
    //Set Light Theme
    userConfig.update(themeKey, light, true);
    userConfig.update(
      "workbench.colorCustomizations",
      lightCustomizations,
      true
    );
  }
}
