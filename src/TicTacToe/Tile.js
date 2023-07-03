import {Component} from 'react';

export default class Tile extends Component {
    constructor(props){
        super(props);
        this.state = {value: <button onClick={this.props.onClick}></button>};
    }



    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            if(this.props.state !== "")
                this.setState({value: this.props.state});
            else
            this.setState({value: <button onClick={this.props.onClick}></button>});
        }
    }

    render() {
        return (
            <div className="tile">
                {this.state.value}
            </div>
        )
    }
}