import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../../components/Detail/Detail";
import ExerciseVideos from "../../components/ExerciseVideos/ExerciseVideos";
import SimilarExercises from "../../components/SimilarExercises/SimilarExercises";
import { exerciseOptions, fetchData } from "../../utils/fetchData";
const ExerciseDetails = () => {
  const [exerciseDetail, setexerciseDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      const exerciseDbUrl = `https://exercisedb.p.rapidapi.com`;
      const youtubeSearchUrl = `https://youtube-search-and-download.p.rapidapi.com`;

      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/${id}`,
        exerciseOptions
      );
      setexerciseDetail(exerciseDetailData);
    };
    fetchExerciseDetail();
  }, [id]);

  return (
    <Box exerciseDetail={exerciseDetail}>
      <Detail />
      <ExerciseVideos />
      <SimilarExercises />
    </Box>
  );
};

export default ExerciseDetails;
