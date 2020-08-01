import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { MatchProps } from '../../models/models';
import Loading from '../../general/loading/Loading';
import GroupAdd from './group-add/GroupAdd';
import GroupList from './group-list/GroupList';
import './Groups.scss';

interface GroupProps {
  match: MatchProps,
}

const Groups = ({ match }: GroupProps): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const subcategoryId = match.params.subcategoryId;

  useFirestoreConnect([
    { collection: 'subcategories', doc: subcategoryId, storeAs: subcategoryId },
    { collection: 'subcategories', doc: subcategoryId, storeAs: `groups-${subcategoryId}`,
      subcollections: [{
        collection: 'groups',
        orderBy: ['createdAt', 'asc']
      }]
    }
  ]);

  const parentCategory = useSelector(({ firestore: { data } }: any) => data[subcategoryId], isEqual);
  const groups = useSelector(({ firestore: { ordered } }: any) => ordered[`groups-${subcategoryId}`], isEqual);

  if(!isLoaded(parentCategory) || !isLoaded(groups)) return <Loading />;

  if(!parentCategory) {
    return (
      <section className="subcategories-admin">
        <div className="subcategories-admin__wrapper page-wrapper">
          <div className="subcategories-admin__header">
            <h1 className="subcategories-admin__heading">
              Subcategory Not Found
            </h1>
            <Link to="/admin-dashboard/word-categories">Back to Top Level Categories</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="groups-admin">
      <div className="groups-admin__wrapper page-wrapper">
        <div className="groups-admin__header">
          <h1 className="groups-admin__heading">
            Groups in <span className="highlight">{parentCategory.name}</span>
          </h1>
          <Link to={`/admin-dashboard/subcategories/${parentCategory.parent}`}>
            Back to Subcategories Page
          </Link>
        </div>
        <p className="groups-admin__description">This is the interface for editing groups inside of a subcategory.</p>
        <GroupAdd setSuccessMessage={setSuccessMessage} subcategoryId={subcategoryId} />
        { successMessage && <p className="groups-admin__success-message success">{ successMessage }</p> }
        <GroupList groups={groups} subcategoryId={subcategoryId} setSuccessMessage={setSuccessMessage} />
      </div>
    </section>
  )
}

export default Groups;
