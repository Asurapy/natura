import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MealList from "./MealList";
import axios from "axios";
import CategoryDrawer from "../components/CategoryDrawer";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 3,
    backgroundColor: theme.palette.background.default,
  },
}));

export default function Main() {
  const classes = useStyles2();
  const [category, setCategory] = React.useState([]);
  const [selectedCategory, setselectedCategory] = useState();
  const [cardsData, setCardData] = useState();

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((response) => {
        setCategory(response.data);
      });

    getMealsByCategory("Beef");
  }, []);

  async function getMealsByCategory(selectedCategory) {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
    );
    console.log("reponse===>", response);
    setCardData(response.data);
  }

  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>

        <CategoryDrawer category={category?.meals} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <MealList cardsData={cardsData?.meals} />
        </main>
      </Container>
    </>
  );
}
