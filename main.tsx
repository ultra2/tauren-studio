import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as io from 'socket.io-client';
import * as SplitPane from 'react-split-pane';
import Navigator from 'navigator';
import Explorer from 'explorer';
import Editor from 'editor';
import { Grid, Row, Col } from 'react-bootstrap';
 

export interface IMainProps {}

export class Main extends React.Component<IMainProps, any> {

    state: {
    }

    constructor () {
        super();
        window["socket"] = io.connect();
        window["socket"].on('log', this.writeLog.bind(this))

        window["global"] = {
            application: ""
        }
    }

    writeLog(message){
        var el = document.getElementById("log")
        el.innerHTML = el.innerHTML + "<br/>" + message
    }

    render () {
        return (
            <div>
                <Navigator />

                <SplitPane split="vertical" minSize={50}
                    defaultSize={ parseInt(localStorage.getItem('splitPosVertical'), 10) }
                    onChange={ size => localStorage.setItem('splitPosVertical', size) }>
                    
                    <Explorer />
                    
                    <SplitPane split="horizontal" minSize={50}
                        defaultSize={ parseInt(localStorage.getItem('splitPosHorizontal'), 10) }
                        onChange={ size => localStorage.setItem('splitPosHorizontal', size) }>

                        <Editor />

                        <div id="log" className="log">Log</div>

                    </SplitPane>
                </SplitPane>
                
            </div>
        );
    }
}
ReactDOM.render(React.createElement(Main), document.getElementById('root'));
