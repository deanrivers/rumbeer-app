import '../../Styles/SwipeNav.css'

import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';

import {NavLink} from 'react-router-dom'
import app from '../../base'
import { withRouter } from "react-router";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background:'black'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
 
}));

const SwipeNav = ({history,...props}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (route) =>{
      if(route==='Logout'){
        app.auth().signOut();
        localStorage.clear();
        props.logout()
        history.push("/");
      }      
  }

  const playerRoutes = [
      {     
        text:'Home',
        route:'/home',
        icon:<HomeIcon/>
      },
      {     
        text:'Stats',
        route:'/stats',
        icon:<EqualizerIcon/>
      },
      {     
        text:'Vote',
        route:'/vote',
        icon:<HowToVoteIcon/>
      },
      {
        text:'Logout',
        route:'/',
        icon:<ExitToAppIcon/>
      }
  ]

  const visitorRoutes = [
    {     
      text:'Home',
      route:'/home',
      icon:<HomeIcon/>
    },
    {
      text:'Logout',
      route:'/',
      icon:<ExitToAppIcon/>
    }
]

  const playerRender = playerRoutes.map((route, index) => (
    <ListItem button key={index} onClick={()=>handleClick(route.text)}>
        <NavLink to={route.route} className="nav-link">
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.text}/>
        </NavLink>
    </ListItem>
  ))

  const visitorRender = visitorRoutes.map((route, index) => (
    <ListItem button key={index} onClick={()=>handleClick(route.text)}>
        <NavLink to={route.route} className="nav-link">
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.text}/>
        </NavLink>
    </ListItem>
  ))

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            RUM AND BEER DRAFT LEAGUE
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {props.isPlayer?playerRender:visitorRender}
        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(SwipeNav)