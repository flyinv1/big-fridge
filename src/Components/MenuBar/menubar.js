import React from 'react';
import './menubar.css';

import logo from '../../img/logo_simple.png';
import home_active from '../../img/home_active.png';
import plots_inactive from '../../img/plots_inactive.png';
import tables_inactive from '../../img/tables_inactive.png';
import chat_inactive from '../../img/chat_inactive.png';

const MenuBar = (props) => {

    //Note:: the MenuBar is nonfunctional, hence the lack of state (or selectable buttons)

    return (
        <div className={"menubar-container"}>
            <div className={"menubar-top"}>
                <div className={"menubar-image-container"}>
                    <img src={logo} alt={""} className={"menubar-image"}/>
                </div>
                <div className={"menubar-button-container"}>
                    <MenuButton src={home_active} label={"dashboard"} active={true}/>
                    <MenuButton src={plots_inactive} label={"plots"}/>
                    <MenuButton src={tables_inactive} label={"tables"}/>
                    <MenuButton src={chat_inactive} label={"chat"}/>
                </div>
            </div>
            <div className={"menubar-bottom"}>
                <p className={'menubar-copyright'}>© 2018 BigFridge</p>
            </div>
        </div>
    );
};

const MenuButton = (props) => {
    let isActive = (props.active) ? "-active" : "";
    return (
        <div className={"menubutton-container" + isActive}>
            <img src={props.src} alt={""} className={"menubutton-image" + isActive}/>
            <p className={"menubutton-label" + isActive}>{props.label}</p>
        </div>
    );
};

export default MenuBar;
