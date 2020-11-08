import React from 'react';
import Loading from '../../general/loading/Loading';
import PageNotFound from '../../general/404/PageNotFound';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { CollectionNames, MatchProps } from '../../models/models';
import './Page.scss';

interface PageProps {
  match: MatchProps,
}

const Page = ({ match }: PageProps): JSX.Element => {
  const pageSlug = match.params.slug;

  useFirestoreConnect([
    { collection: CollectionNames.Pages, where:['slug', '==', pageSlug], storeAs: 'page' },
  ]);

  const pageContent = useSelector(({ firestore: { ordered } }: any) => ordered['page'], isEqual);

  if(!isLoaded(pageContent)) return <Loading />;

  if(!pageContent || !pageContent[0]) return <PageNotFound />;

  return (
    <div className="single-page">
      <div className="single-page__wrapper">
        <div className="single-page__main-content" dangerouslySetInnerHTML={{ __html: pageContent[0].mainContent }}></div>
      </div>
    </div>
  )
}

export default Page;
