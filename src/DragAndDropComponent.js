import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export function FileDropzone(props) {

  let {
    fileCallback,
    ...otherProps
  } = props;
  const onDrop = useCallback(acceptedFiles => {
    fileCallback(acceptedFiles);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  

  return (
    <div {...getRootProps()} {...otherProps}>
      <input style={{height: "100%"}} {...getInputProps()}  />
      {
        isDragActive ?
          <h2>Drop the files here ...</h2> :
          <h2>Drag 'n' drop a file here, or click to select a file</h2>
      }
    </div>
  )
}