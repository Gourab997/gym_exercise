import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../../utils/fetchData";
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
    window.scrollTo({ top: 1500, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exerciseData = [];
      if (bodyPart === "all") {
        exerciseData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exerciseData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }
      setExercise(exerciseData);
    };
    fetchExercisesData();
  }, [bodyPart]);

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
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
