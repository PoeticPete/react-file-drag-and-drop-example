import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FileDropzone } from './DragAndDropComponent';

class App extends React.Component {

  state = {
    fileInputColor: "red"   // start off with red
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
    this._changeFileInputColorTo("red");
  }

  onDragEnter = (stuff) => {
    console.log("drag enetered")
    this._changeFileInputColorTo("green");
  }

  onDragExit = (stuff) => {
    console.log("drag exited")
    this._changeFileInputColorTo("red");
  }

  _changeFileInputColorTo = (color) => {
    this.setState({
      fileInputColor: color,
    });
  }

  render() {
    return (
      <div className="App" >
        <FileDropzone
          onDragEnter={this.onDragEnter}
          onDragExit={this.onDragExit}
          fileCallback={this.onFileInput} 
          style={{
            backgroundColor: this.state.fileInputColor, 
            height: "25vh"
          }}
        />
        { this.state.currFile && <img src={this.state.currFile}/> }
        { this.state.currFileName && <p>{this.state.currFileName}</p> }
        { this.state.currFileSize && <p>{this.state.currFileSize} bytes</p> }
        { this.state.currFileType && <p>{this.state.currFileType}</p> }
        
      </div>
    );
  }
  
}

export default App;
