import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Meals from "../components/Meals";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

export default function MealList({
  cardsData,
  paginate,
  currentPage,
  totalCards,
  cardsPerPage,
}) {
  console.log("que sos++>", cardsData);
  if (cardsData === null || cardsData === undefined)
    return (
      <Typography style={{ marginTop: 20, textAlign: "center" }} variant="h3">
        NOTHING TO SHOW...
      </Typography>
    );
  const numberOfPages = Math.ceil(totalCards / cardsPerPage);
  return (
    <>
      {" "}
      {cardsData && (
        <>
          <Grid container spacing={2} justify="center" alignItems="flex-start">
            {cardsData.map((data) => (
              <Grid item xs={12} ls={6} md={4} lg={3} xl={3} key={data.idMeal}>
                <Meals data={data} />
              </Grid>
            ))}
          </Grid>
          <Grid container justify="flex-end" spacing={3}>
            <Pagination
              style={{ marginTop: 20 }}
              color="primary"
              count={numberOfPages}
              page={currentPage}
              onChange={(event, value) => paginate(event, value)}
            />
          </Grid>
        </>
      )}
    </>
  );
}
