import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

    buttons = [
        {name: 'All', label: 'All'},
        {name: 'Active', label: 'Active'},
        {name: 'Done', label: 'Done'}
    ]



    render() {

        const {filter, onSearchBy} = this.props

        const buttons = this.buttons.map(({name,label}) => {
            const isActive = filter === name
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
            return (
                <button key={name} type="button" className={`btn ${clazz}`} onClick={()=> onSearchBy(name)}>{label} </button>
            )
        })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}
