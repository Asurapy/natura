import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Meals from "../components/Meals";
import axios from "axios";

export default function MealList({ cardsData }) {
  console.log("cardsData===>", cardsData);
  return (
    <>
      {cardsData && (
        <Grid container spacing={2} justify="center" alignItems="flex-start">
          {cardsData.map((data) => (
            <Grid item xs={12} ls={6} md={4} lg={3} xl={3} key={data.idMeal}>
              <Meals data={data} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
