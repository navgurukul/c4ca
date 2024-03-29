import React, { useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

const DragDropZone = (props) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const [fileList, setFileList] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileDrop(files);
  };

  const onFileDrop = (e) => {
    e.preventDefault();
    const files = e.target.files;
    handleFileDrop(files);
  };

  const handleFileDrop = (files) => {
    const newFileList = [...fileList];
    for (let i = 0; i < files.length; i++) {
      newFileList.push(files[i]);
    }
    setFileList(newFileList);
  };

  const removeFile = (file) => {
    const updatedList = fileList.filter((item) => item !== file);
    setFileList(updatedList);
  };

  return (
    <Box
      ref={wrapperRef}
      onDragEnter={onDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`drop-file-input ${isDragOver ? "dragover" : ""}`}
    >
      {fileList.length > 0 ? (
        <Box sx={{ backgroundColor: "pink" }} className="drop-file-preview">
          {fileList.map((item, index) => (
            <Box key={index} className="drop-file-preview__item">
              <Box className="drop-file-preview__item__info">
                <img src="/project.svg" alt="" />
                <Typography variant="body1" color="text.primary">
                  {item.name}
                </Typography>
              </Box>
              <Button onClick={() => removeFile(item)}>
                <Delete />
                <Typography variant="ButtonLarge">Remove file</Typography>
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        
        <Box className="drop-file-input__label" >
        <input
        ref={inputRef}
        type="file"
        multiple
        onChange={onFileDrop}
        accept=".sb3"
        style={{ display: "none" }}
      />
          <img src="/file_upload.svg" alt=""  onClick={() => inputRef.current.click()}/>
          <Box sx={{ display: "grid", gap: 1 }}>
            <Typography variant="body1" color="primary"  onClick={() => inputRef.current.click()}>
              Upload or Drag File
            </Typography>
            <Typography variant="caption" color="text.secondary">
              .sb3 format accepted
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DragDropZone;
