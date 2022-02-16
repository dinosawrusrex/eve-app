import React from 'react';
import { Exercise } from '../../models/models';
import ExerciseAdd from './exercise-add/ExerciseAdd';
import ExerciseCard from './exercise-card/ExerciseCard';
import './Exercises.scss';

interface ExercisesProps {
  exercises: Exercise[],
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
  subcategoryId: string,
  groupId: string,
}

const Exercises = ({ exercises, setSuccessMessage, subcategoryId, groupId}: ExercisesProps): JSX.Element => {
  const renderExercises = (): JSX.Element[] => {
    return exercises.map((exercise: Exercise, index: number) => (
      <li key={exercise.id}>
        <ExerciseCard
          number={index + 1}
          exercise={exercise}
          subcategoryId={subcategoryId}
          groupId={groupId}
          setSuccessMessage={setSuccessMessage}
        />
      </li>
    ));
  }
  
  return (
    <div className="exercises">
      <h2>Exercises</h2>
      <ExerciseAdd setSuccessMessage={setSuccessMessage} subcategoryId={subcategoryId} groupId={groupId} />
      <ul className="exercises__list">
        {
          exercises.length
            ? renderExercises()
            : <p>No exercises have been added to this group yet.</p>
        }
      </ul>
    </div>
  )
}

export default Exercises;