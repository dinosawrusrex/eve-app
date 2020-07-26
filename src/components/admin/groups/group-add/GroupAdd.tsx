import React, { useState } from 'react';
import firebase from '../../../../config/firebaseConfig';
import './GroupAdd.scss';

interface GroupAddProps {
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
  subcategoryId: string,
}

const GroupAdd = ({ setSuccessMessage, subcategoryId }: GroupAddProps): JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [addError, setAddError] = useState<string>('');
  const groupsCollection = firebase.firestore().collection('subcategories').doc(subcategoryId).collection('groups');

  const addGroup = (): void => {
    setSubmitting(true);

    const newDocument = {
      createdAt: new Date(),
    }

    groupsCollection.doc().set(newDocument).then((): void => {
      setSubmitting(false);
      setAddError('');
      setSuccessMessage('New group added');
    }).catch((error: {message: string}) => {
      setSubmitting(false);
      setAddError(error.message);
      setSuccessMessage('');
    });
  }

  return (
    <div className="group-add">
      <h2 className="group-add__heading">Add a New Group</h2>
      <button className="group-add__add-button" onClick={addGroup} disabled={submitting}>Add</button>
      { !addError && <p className="group-add__error error">{ addError }</p> }
    </div>
  )
}

export default GroupAdd;
