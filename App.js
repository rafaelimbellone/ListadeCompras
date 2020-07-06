import React from 'react';
import Routes from './src/routes';
import { YellowBox, StatusBar } from 'react-native';

YellowBox.ignoreWarnings([
    'Warning:'
]);


// define cor da Startus bar
StatusBar.setBackgroundColor("#fff");
StatusBar.setBarStyle("dark-content");

export default function App() {
  return (
    <Routes />
  );
}


