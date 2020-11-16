import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import MealDetail from "./MealDetail";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Meals({ data }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [expandedData, setExpandedData] = React.useState(undefined);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setExpandedData(undefined);
    getMealsByCategory(data.idMeal);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpandedData(undefined);
    getMealsByCategory(data.idMeal);
    setExpanded(!expanded);
  };

  async function getMealsByCategory(idMeal) {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    console.log("reponse===>", response);
    setExpandedData(response.data);
  }

  return (
    <>
      <Card className={classes.root} onClick={handleOpen}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {data.strMeal?.charAt(0)}
            </Avatar>
          }
          title={data.strMeal}
          // subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={data.strMealThumb}
          title={data.strMeal}
        />
      </Card>
      <MealDetail open={open} handleClose={handleClose} detail={expandedData} />
    </>
  );
}
