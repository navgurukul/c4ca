import { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { HighlightOff } from "@mui/icons-material";

const DragDropZone = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      // props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    // props.onFileChange(updatedList);
  };
  return (
    <>
      {fileList.length > 0 ? (
        <Box className="drop-file-preview">
          {fileList.map((item, index) => (
            <Box key={index} className="drop-file-preview__item">
              <Box className="drop-file-preview__item__info">
                <img src="/project.svg" alt="" />
                <Typography variant="body1" color='text.primary'>{item.name}</Typography>
              </Box>

              <HighlightOff
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              />
            </Box>
          ))}
        </Box>
      ) : null}

      <Box
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="drop-file-input"
      >
        <Box className="drop-file-input__label">
          <img src="/file_upload.svg" alt="" />
          <Box sx={{display:'grid', gap:1}}>
            <Typography variant="body1" color='primary'>
              Upload or Drag File
            </Typography>
            <Typography variant="caption" color='text.secondary'>
              .sb3 format accepted
            </Typography>
          </Box>
        </Box>
        <input type="file" multiple onChange={onFileDrop} accept=".sb3"/>
      </Box>
    </>
  );
};

export default DragDropZone;
