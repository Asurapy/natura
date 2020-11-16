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
  toolbar: { minHeight: 100 },
  content: {
    flexGrow: 3,
    backgroundColor: theme.palette.background.default,
  },
}));

export default function Main() {
  const classes = useStyles2();
  const [category, setCategory] = React.useState([]);
  const [selectedCategory, setselectedCategory] = useState("Beef");
  const [cardsData, setCardData] = useState();
  const [type, setType] = React.useState("NAME");
  const [search, setSearch] = React.useState("");

  console.log("category===>", category);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((response) => {
        let data = response.data.meals.map((x) => {
          return { ...x, selected: false };
        });
        setCategory(data);
      });
    if (selectedCategory !== undefined) {
      getMealsByCategory(selectedCategory);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory !== undefined && selectedCategory !== "Search") {
      getMealsByCategory(selectedCategory);
      setSearch("");
      setType("NAME");
    }
  }, [selectedCategory]);

  async function getMealsByCategory(selectedCategory) {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
    );
    console.log("reponse===>", response);

    setCardData(response.data);
  }

  async function searchByType(event, type, search) {
    console.log(event, type, search);
    event.preventDefault();
    var url = "";
    if (type === "NAME") {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    }
    if (type === "INGREDIENT") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
    }
    const response = await axios.get(url);
    setselectedCategory("Search");
    let data = category.map((x) => {
      return { ...x, selected: false };
    });
    setCategory(data);
    setCardData(response.data);
  }

  function newCategory(newCategory) {
    setselectedCategory(newCategory);

    let data = category.map((x) => {
      if (x.strCategory === newCategory) {
        return { ...x, selected: true };
      } else {
        return { ...x, selected: false };
      }
    });
    setCategory(data);
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

        <CategoryDrawer
          category={category}
          setselectedCategory={newCategory}
          searchByType={searchByType}
          type={type}
          search={search}
          setType={setType}
          setSearch={setSearch}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <MealList cardsData={cardsData?.meals} />
        </main>
      </Container>
    </>
  );
}
