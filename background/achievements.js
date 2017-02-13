'use strict';

import { incrementStreak, addNewAchievement } from './reducers/user';

function checkAchievements () {
  var state = store.getState();
  var t = new Date();
  var time = t.toString().slice(16, 21);

  store.dispatch({type: 'getChartSteps'});
  store.dispatch(incrementStreak());

  if(state.user.streak >= 7 && state.user.badges.indexOf(0) === -1) store.dispatch(addNewAchievement(0));
  if(state.user.streak >= 14 && state.user.badges.indexOf(1) === -1) store.dispatch(addNewAchievement(1));
}

export default checkAchievements;
