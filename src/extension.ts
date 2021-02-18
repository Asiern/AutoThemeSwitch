"use strict";
import * as vscode from "vscode";

//Get User config
const userConfig = vscode.workspace.getConfiguration();
let config;
let light: any, dark: any;
let darkCustomizations: any, lightCustomizations: any;
let lightTime: number, darkTime: number;

let themeKey = "workbench.colorTheme";

//Parse string time to object
function parseTime(va: string) {
  let t = va.split(":");
  if (t.length !== 2) {
    throw new Error("Could not parse time");
  }
  return Number(t[0]) + Number(t[1]) / 60;
}

function updateSettings() {
  config = vscode.workspace.getConfiguration("AutoThemeSwitch");
  //Dark Theme
  dark = config.dark;
  darkCustomizations = config.darkCustomizations;
  //Light Theme
  light = config.light;
  lightCustomizations = config.lightCustomizations;
  //Time
  darkTime = parseTime(config.darkTime); //Start of darkTime
  lightTime = parseTime(config.lightTime); //Start lightTime
}

function applyChanges() {
  let time = new Date();
  const hours = time.getHours() + time.getMinutes() / 60;
  //Get current theme from userConfig
  const currentTheme = userConfig.get("workbench.colorTheme");
  if (lightTime <= hours && hours < darkTime) {
    //Set Light Theme
    if (currentTheme !== light) {
      userConfig.update(themeKey, light, true);
      userConfig.update(
        "workbench.colorCustomizations",
        lightCustomizations,
        true
      );
      vscode.window.showInformationMessage("Theme set to light " + light);
    }
  } else {
    //Set Dark Theme
    if (currentTheme !== dark) {
      userConfig.update(themeKey, dark, true);
      userConfig.update(
        "workbench.colorCustomizations",
        darkCustomizations,
        true
      );
      vscode.window.showInformationMessage("Theme set to " + dark);
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      try {
        updateSettings();
        applyChanges();
      } catch (e) {
        vscode.window.showErrorMessage(e);
        console.log(e);
      }
    })
  );
  try {
    updateSettings();
    applyChanges();
  } catch (e) {
    vscode.window.showErrorMessage(e);
    console.log(e);
  }
}
