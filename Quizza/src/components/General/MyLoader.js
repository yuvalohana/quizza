import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import '../../css/loader.css';

export class MyLoader extends Component {
    render() {
        return (
            <div className={this.props.wrapperClass}>

                {this.props.loaded ?
                    <div>{this.props.children}</div>
                    :
                    (<div className="loader-container">
                        <Loader type="Puff" color="rgb(217, 144, 230)" />
                    </div>)
                }

            </div>
        )
    }
}

export default MyLoader