import React, {Component} from 'react';
import './searchbar.css';

import search_icon from '../../img/search.png';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"searchbar-container"}>
                <div className={"searchbar-left-container"}>
                    <img src={search_icon} alt={""} className={"searchbar-image"}/>
                    <input
                        placeholder={"Search Fridge"}
                        onKeyUp={(e)=>{
                            console.log(e.target.value);
                            if (e.key === "Enter") this.props.updateSearchParameter(e.target.value);
                        }}
                        className={"searchbar-input"}/>
                </div>
                <div className={"searchbar-right-container"}>
                    <p className={"searchbar-account-label"}>{"John Doe"}</p>
                    <img src={""} alt={""} className={"searchbar-account-img"}/>
                </div>
            </div>
        )
    }

}