// Learning Cards
// export const LearnCards = ({
//   image,
//   title,
//   subtitle,
//   progress,
//   btnText1,
//   btnText2,
//   color,
//   textColor,
//   bgImage_web,
//   bgImage_mobile,
// }) => {
//   const isMobile = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

//   return (
//     <>
//       <img
//         src={isMobile ? bgImage_mobile : bgImage_web}
//         alt="bgImage"
//         style={{ width: "100%" }}
//       />

//       <Box
//         sx={{
//           height: "80%",
//           border: "1px solid",
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           position: "absolute",
//           top: 0,
//         }}
//       >
//         <Box sx={{ alignSelf: "center", border: "1px solid" }}>
//           <img
//             src={image}
//             alt="image"
//             style={{ width: "100%", alignSelf: "center", border: "1px solid" }}
//           />
//         </Box>

//         <Box
//           sx={{
//             width: "100%",
//             padding: isMobile ? 4 : 6,
//             display: "grid",
//             gap: isMobile ? 2 : 10,
//             alignSelf: "start",
//           }}
//         >
//           <Box sx={{ display: "grid", gap: 2 }}>
//             <Typography variant="h6" sx={{ textAlign: "start" }}>
//               {title}
//             </Typography>
//             <Typography variant="body1" sx={{ color: textColor }}>
//               {subtitle}
//             </Typography>
//             <Box sx={{ display: "grid", gap: 1 }}>
//               <Typography variant="body2" sx={{ color: textColor }}>
//                 Progress: {progress}
//               </Typography>
//               <ProgressBar progress={progress} />
//             </Box>
//           </Box>

//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button className="button" sx={{ border: `1px solid ${color}` }}>
//               <Typography variant="ButtonLarge" sx={{ color: color }}>
//                 {btnText1}
//               </Typography>
//             </Button>
//             <Button className="button" sx={{ border: `1px solid ${color}` }}>
//               <Typography variant="ButtonLarge" sx={{ color: color }}>
//                 {btnText2}
//               </Typography>
//               <Launch sx={{ color: color }} />
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

{/* <Box sx={{ width: "fit-content", position: "relative" }} className='m-Auto'>
      <img
        src={isMobile ? bgImage_mobile : bgImage_web}
        alt="background-image"
        style={{ width: "100%" }}
      />

      <Box sx={{height: "80%", display: "flex",flexDirection: isMobile ? "column" : "row", position: "absolute",top: '0'}}>
        <Box sx={{ height:'fit-content',border: "1px solid", alignSelf:'center' }}>
          <img
            src={image}
            alt="image"
            style={{ width: "100%"}}
          />
        </Box>

        <Box sx={{ width: "100%", padding:4, display: "grid", gap: isMobile ? 3 : 10 }}>
          <Box sx={{display:'grid', gap:2}}>
            <Typography variant="h6" sx={{ textAlign: "start" }}>{title}</Typography>
            <Typography variant="body1" sx={{ color: textColor }}>{subtitle}</Typography>
            <Box>
              <Typography variant="body2" sx={{ color: textColor }}>
                 Progress: {progress}
              </Typography>
            <ProgressBar progress={progress}/>
            </Box>
          </Box>

          <Box sx={{display:'flex', gap: 2}}>
            <Button className="button" sx={{ border: `1px solid ${color}` }}>
              <Typography variant="ButtonLarge" sx={{color:color}}>{btnText1}</Typography>
            </Button>
            <Button className="button" sx={{ border: `1px solid ${color}` }}>
              <Typography variant="ButtonLarge" sx={{color:color}}>{btnText2}</Typography>
              <Launch sx={{color:color}}/>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box> */}