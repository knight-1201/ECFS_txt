
import * as React from 'react';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from './MenuItem';


const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon /> },
  { text: '數據集管理', icon: <AnalyticsRoundedIcon />, 
    subList: [
      { subtext: '上傳資料', subIcon: <AnalyticsRoundedIcon />},
      { subtext: '通知設定', subIcon: <AnalyticsRoundedIcon />}
    ]
  },
  { text: '模型管理', icon: <SettingsRoundedIcon />, 
    subList: [
      { subtext: '模型名稱', subIcon: <SettingsRoundedIcon />},
      { subtext: '選擇因子', subIcon: <SettingsRoundedIcon />},
      { subtext: '模型訓練區間', subIcon: <SettingsRoundedIcon />},
      { subtext: '模型訓練', subIcon: <SettingsRoundedIcon />},
      { subtext: '模型資訊', subIcon: <SettingsRoundedIcon />},
      { subtext: '訓練資訊', subIcon: <SettingsRoundedIcon />},
      { subtext: '模型評估', subIcon: <SettingsRoundedIcon />},
    ]
  },
  { text: '模型結果', icon: <AssignmentRoundedIcon />, 
    subList: [
      { subtext: '版本比較', subIcon: <AssignmentRoundedIcon />},
      { subtext: '版本儲存', subIcon: <AssignmentRoundedIcon />}
    ]
  },
  { text: '模擬與預測', icon: <TrackChangesRoundedIcon />, 
    subList: [
      { subtext: '模擬時間', subIcon: <TrackChangesRoundedIcon />},
      { subtext: '預測', subIcon: <TrackChangesRoundedIcon />}
    ]
  }
];
const secondaryListItems = [
  { image: '/images/menu_data.png', title: 'Data Management' },
  { image: '/images/menu_modeltrain.png', title: 'Model Training' },
  { image: '/images/menu_modelmanage.png', title: 'Model Management' },
  { image: '/images/menu_simulation.png', title: 'Simulation & Prediction' },
  { image: '/images/menu_permission.png', title: 'Permissions' },
];
const imgUrl = new URL('./images/1.png', import.meta.url).href

export default function MenuContent() {
  const openStatus = Array(mainListItems.length).fill(false);
  const [open, setOpen] = React.useState(openStatus);
  const handleClick = (i) => {
    const newOpen = open.map((value,index) => {
      if(index === i) {
        value = !value
      }
      else {
        value = false
      }
      return value;
    });
    setOpen(newOpen);
  };
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between'}} >
      <List >
        {secondaryListItems.map((item) => {
          return (
            <ListItem key={item.title} disablePadding>
              <ListItemButton>
                <MenuItem image={item.image} title={item.title}/>
              </ListItemButton>
            </ListItem>
          )
        })}
        {/* {mainListItems.map((item, index) => {
          if (item.subList) {
            return (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton onClick={()=> {handleClick(index)}}>
                  <ListItemIcon>
                  {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                  {item.subList.map((item) => (
                    <ListItemButton key={item.subtext} sx={{ pl: 4 }}>
                      <ListItemIcon>{item.subIcon}</ListItemIcon>
                      <ListItemText primary={item.subtext} />
                    </ListItemButton>
                ))}
                  </List>
                </Collapse>
              </ListItem>)
        } else{
          return(
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton selected={index === 0}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
        )}})} */}
      </List>
    </Stack>
  );
}
