import React from 'react';
import '../styles/TitleBar.scss';
import logo from '../assets/logo.png';

const TitleBar: React.FC = () => (
  <div className="title-bar">
    <img src={logo} className="logo" alt="logo" />
  </div>
);

export default TitleBar;
