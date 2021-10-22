import React, { Component } from "react";
import { render } from "react-dom";
import App from './App';

import './utils/debug';


const mountNode = document.getElementById('app')
render(<App name="决明"/>, mountNode);

