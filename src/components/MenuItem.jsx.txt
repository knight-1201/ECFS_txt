
import { Box } from '@mui/material';

function MenuItem({image, title}) {

  return (
    <Box sx={{ padding: '10px', width: '100%', display:'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid gray'}}>
        <div style={{ width: '50%'}}>
            <img src={image} alt={title} style={{ width: '100%'}}/>
        </div>
        <h4 style={{ textAlign:'center', width: '100%', margin: '4px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{title}</h4>
    </Box>    
  )
}

export default MenuItem