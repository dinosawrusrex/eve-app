import React from 'react';
import { Link } from 'react-router-dom';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { CollectionNames, MatchProps } from '../../models/models';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import Loading from '../../general/loading/Loading';
import WordList from './word-list/WordList';
import ExerciseList from './exercise-list/ExerciseList';
import './Group.scss';

interface GroupProps {
  match: MatchProps,
}

const Group = ({ match }: GroupProps): JSX.Element => {
  const subcategoryId = match.params.subcategoryId;
  const groupId = match.params.groupId;

  useFirestoreConnect([
    { collection: CollectionNames.Subcategories, doc: subcategoryId, storeAs: subcategoryId },
    { collection: CollectionNames.Subcategories, doc: subcategoryId, storeAs: groupId,
      subcollections: [{ collection: CollectionNames.Groups, doc: groupId }]
    },
    { collection: CollectionNames.Subcategories, doc: subcategoryId, storeAs: `exercises-${groupId}`,
      subcollections: [{ collection: CollectionNames.Groups, doc: groupId,
        subcollections: [{ collection: CollectionNames.Exercises, orderBy: ['createdAt', 'asc'] }]
      }]
    }
  ]);

  const subcategory = useSelector(({ firestore: { data } }: any) => data[subcategoryId], isEqual);
  const group = useSelector(({ firestore: { data } }: any) => data[groupId], isEqual);
  const exercises = useSelector(({ firestore: { ordered } }: any) => ordered[`exercises-${groupId}`], isEqual);

  if(!isLoaded(subcategory) || !isLoaded(group) || !isLoaded(exercises)) return <Loading />;

  if(!subcategory || !group) {
    return (
      <section className="group">
        <div className="group__wrapper page-wrapper">
        <div className="group__header">
            <h1 className="group__heading">
              Group not Found
            </h1>
            <Link to={'/word-categories'}>
              Back to Word Categories
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const wordList = Object.keys(group.words).sort();

  return (
    <section className="group">
      <div className="group__wrapper page-wrapper">
        <div className="group__header">
          <h1 className="group__heading">
            Group in {subcategory.name}
          </h1>
          <Link to={`/groups/${subcategoryId}`}>
            Back to {subcategory.name}
          </Link>
        </div>
        <p className="group__description">
          Please select a word to learn more about it, or select an exercise below to test how well you know these words.
        </p>
        {
          wordList.length
            ? <WordList wordInfo={group.words} wordList={wordList} />
            : <>
                <h2>Word List</h2>
                <p>There are no words to display in this group.</p>
              </>
        }
        {
          exercises.length
            ? <ExerciseList exercises={exercises} subcategoryId={subcategoryId} groupId={groupId} />
            : <>
                <h2>Exercises</h2>
                <p>There are no exercises to display in this group.</p>
              </>
        }
      </div>
    </section>
  )
}

export default Group;
