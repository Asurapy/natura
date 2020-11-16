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
    setExpandedData(undefined);
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
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {data.strMeal?.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={data.strMeal}
          // subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={data.strMealThumb}
          title={data.strMeal}
        />
        {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent> */}
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {/* <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton> */}
          <Button
            style={{ marginLeft: "auto" }}
            onClick={handleOpen}
            color="primary"
          >
            MORE
          </Button>
        </CardActions>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {expandedData === undefined && (
              <Typography paragraph>Loading...</Typography>
            )}
            {expandedData && (
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
            )}
          </CardContent>
        </Collapse> */}
      </Card>
      <MealDetail open={open} handleClose={handleClose} detail={expandedData} />
    </>
  );
}
