//  splitChunks initial,async,all
import 'react';
import('lodash');
import 'jquery'

// styling loaders
import './style.scss';

// loaders...
import './header';  // 这是header
import landscape from './landscape.jpg';
import readme from './readme.md';

// dynamic import | code split | lazy loading
var btn_module = 'btn1'
var btn1 = document.getElementById("btn1");
btn1.addEventListener('click', () => {
    import(/* webpackChunkName: "[index].[request]" */ `./${btn_module}`);
}, false);


// tree shaking
import {cube} from './math';
console.log(cube(10));
