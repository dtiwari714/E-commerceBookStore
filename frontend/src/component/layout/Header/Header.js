import styled from '@emotion/styled'
import {AppBar, Toolbar, Typography,Box, InputBase,  Badge,Button} from '@mui/material'
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const StyledToolbar = styled(Toolbar)({
  display:"flex",
  justifyContent:"space-around"
})
const Search = styled("div")(({theme})=>({
  backgroundColor:"white",
  padding:"10 5px",
  borderRadius:"8px",
  width:"25%"
}))
const Icons = styled(Box)(({theme})=>({
  display:"flex",
  gap:"25px"
}))


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
export default function Header() {
  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Typography variant="h5" >BooksBug</Typography>
        <Box sx={{ display: 'inline-flex',padding:2}}>
          <Button sx={{ my: 0, color: 'white', display: 'block' }}>Home</Button>
          <Button sx={{ my: 0, color: 'white', display: 'block' }}>About Us</Button>
          <Button sx={{ my: 0, color: 'white', display: 'block' }}>Contact Us</Button>
        </Box>
        <Search>
            <StyledInputBase
              placeholder="Search your Books…"
            />
          </Search>
        <Icons>
      <Badge badgeContent={4} color="error">
        <ShoppingCartIcon />
      </Badge>
      <Badge  >
        <AccountBoxIcon />
      </Badge>
      </Icons>
      
      </StyledToolbar>
    </AppBar>
    
    
  )
}
