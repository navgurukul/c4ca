import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

const DragDropZone = (props) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (props.value && Array.isArray(props.value)) {
      setFileList(props.value);
    }
  }, [props.value]);

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
    props.onChange(newFileList);
  };

  const removeFile = (file) => {
    const updatedList = fileList.filter((item) => item !== file);
    setFileList(updatedList);
    props.onChange(updatedList);
  };

  const downloadFile = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <Box
      ref={wrapperRef}
      onDragEnter={onDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={onDragLeave}
      onClick={handleClick}
      onDrop={onDrop}
      className={`drop-file-input ${isDragOver ? "dragover" : ""}`}
    >
      {fileList.length > 0 && fileList[0] && (
        <Box sx={{ backgroundColor: "pink" }} className="drop-file-preview">
          {fileList.map((item, index) => (
            <Box key={index} className="drop-file-preview__item">
              <Box className="drop-file-preview__item__info">
                <img src="/project.svg" alt="" />
                <Typography variant="body1" color="text.primary" onClick={() => downloadFile(item)}>
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
      )}

      {fileList.length === 0 && (
        <Box className="drop-file-input__label">
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={onFileDrop}
            accept=".txt, .docx, .jpg, .pdf, .sb3"
            style={{ display: "none" }}
          />
          <img src="/file_upload.svg" alt=""  />
          <Box sx={{ display: "grid", gap: 1 }}>
            <Typography variant="body1" color="primary" >
              Upload or Drag File
            </Typography>
            <Typography variant="caption" color="text.secondary">
              .txt, .docx, .jpg, .pdf , .sb3 formats accepted
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DragDropZone;
