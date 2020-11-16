import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Search from "./Search";
import { Grid } from "@material-ui/core";

const drawerWidth = 140;

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function CategoryDrawer({
  category,
  setselectedCategory,
  searchByType,
  type,
  search,
  setType,
  setSearch,
}) {
  const classes = useStyles2();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item xs={12} ls={12} md={2} lg={3} xl={3}>
              <Typography style={{ marginTop: 12 }} variant="h6">
                MEALS LIST
              </Typography>
            </Grid>
            <Grid item xs={12} ls={12} md={10} lg={9} xl={9}>
              <Search
                searchByType={searchByType}
                type={type}
                search={search}
                setType={setType}
                setSearch={setSearch}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {category &&
            category.map((data, index) => (
              <ListItem
                button
                key={data.strCategory}
                onClick={(event) => setselectedCategory(event.target.innerText)}
                button
                selected={data.selected}
              >
                <ListItemText primary={data.strCategory} />
              </ListItem>
            ))}
        </List>
      </Drawer>
    </div>
  );
}
