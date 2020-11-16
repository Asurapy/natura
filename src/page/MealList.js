import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Meals from "../components/Meals";
import Typography from "@material-ui/core/Typography";

export default function MealList({ cardsData }) {
  console.log("cardsData===>", cardsData);
  if (cardsData === null)
    return (
      <Typography style={{ marginTop: 20, textAlign: "center" }} variant="h3">
        NOTHING TO SHOW...
      </Typography>
    );
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
