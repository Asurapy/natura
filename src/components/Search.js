import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 600,
    flexGrow: 1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  formControl: {
    marginLeft: theme.spacing(1),
    // minWidth: 140,
    padding: 0,
  },
}));

export default function Search({
  searchByType,
  type,
  search,
  setType,
  setSearch,
}) {
  const classes = useStyles();

  return (
    <Paper
      component="form"
      className={classes.root}
      onSubmit={(event) => {
        searchByType(event, type, search);
      }}
    >
      <FormControl variant="filled" className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          onChange={(event) => {
            setType(event.target.value);
          }}
        >
          <MenuItem value={"NAME"}>NAME</MenuItem>
          <MenuItem value={"INGREDIENT"}>INGREDIENT</MenuItem>
        </Select>
      </FormControl>
      <Divider className={classes.divider} orientation="vertical" />

      <InputBase
        className={classes.input}
        placeholder="Search Meals"
        inputProps={{ "aria-label": "search meals" }}
        value={search}
        onChange={(event) => {
          console.log("cambio");
          setSearch(event.target.value);
        }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
