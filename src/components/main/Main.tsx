import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './header/Header';
import Home from './home/Home';
import PageNotFound from '../general/404/PageNotFound';
import WordCategories from './word-categories/WordCategories';
import Subcategories from './subcategories/Subcategories';
import Groups from './groups/Groups';
import Group from './group/Group';
import WeeklyStudyGuides from './weekly-study-guides/WeeklyStudyGuides';

const Main = (): JSX.Element => {
  return (
    <main>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/word-categories" component={WordCategories} />
        <Route exact path="/subcategories/:categoryId" component={Subcategories} />
        <Route exact path="/groups/:subcategoryId/" component={Groups} />
        <Route exact path="/group/:subcategoryId/:groupId" component={Group} />
        <Route exact path="/weekly-study-guides" component={WeeklyStudyGuides} />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </main>
  )
}

export default Main;
