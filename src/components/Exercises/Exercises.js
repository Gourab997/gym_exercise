import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ExerciseCard from "../ExerciseCard/ExerciseCard";

const Exercises = ({ exercise, setExercise, bodyPart }) => {
  const [currentPage, setcurrentPage] = useState(1);
  const exercisePerPage = 9;

  const indexOfLastExercise = currentPage * exercisePerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
  const currentExercises = exercise.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e, value) => {
    setcurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };
  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h4" mb="20px">
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises?.map((exercises, index) => (
          <ExerciseCard key={index} exercise={exercises} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercise?.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercise.length / exercisePerPage)}
            page={currentPage}
            onChange={paginate}
            Size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
