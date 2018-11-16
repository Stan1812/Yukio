import foo from './components/example.js';
import THREELib from 'three-js';
import './assets/css/reset.css';
import '../app.css';
(function main() {
  const THREE = THREELib(); // return THREE JS
  console.log(THREE);
  foo();
})();
