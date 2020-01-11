import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FileDropzone } from './DragAndDropComponent';

const DRAG_OFF_COLOR = 'clear'

class App extends React.Component {

  state = {
    isOn: false,
  }

  onFileInput = (files) => {
    console.log(files[0])
    // Prevent memory leak of any old files in memory
    URL.revokeObjectURL(this.state.currFile);   


    this.setState({
      currFile: URL.createObjectURL(files[0]),
      currFileName: files[0].name,
      currFileSize: files[0].size,
      currFileType: files[0].type,
    });
    this._changeFileInputColorTo(DRAG_OFF_COLOR);
    this.setState({
      isOn: false
    })
  }

  onDragEnter = (stuff) => {
    console.log("drag enetered")
    this.setState({
      isOn: true
    })
  }

  onDragExit = (stuff) => {
    console.log("drag exited")
    this.setState({
      isOn: false
    })
  }

  render() {
    console.log("rendering!" + this.state.fileInputColor)
    return (
      <div className="App" >
        <FileDropzone
          onDragEnter={this.onDragEnter}
          onDragExit={this.onDragExit}
          fileCallback={this.onFileInput} 
          style={{
            backgroundColor: 'green', 
            height: "100vh",
            display: "flex",
            alignItems: "center",
            // pointerEvents: "none",
            opacity: this.state.isOn ? "1" : "0.5"
          }}
        >
          <div> hey!</div>
          
        </FileDropzone>
        { this.state.currFile && <img src={this.state.currFile}/> }
        { this.state.currFileName && <p>{this.state.currFileName}</p> }
        { this.state.currFileSize && <p>{this.state.currFileSize} bytes</p> }
        { this.state.currFileType && <p>{this.state.currFileType}</p> }
        
      </div>
    );
  }
  
}

export default App;
