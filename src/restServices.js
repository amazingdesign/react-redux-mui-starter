import makeRestServices, { crudActionsDeclarations } from 'redux-rest-services'

import axios from './axios'

export const restServices = makeRestServices(
  [
    {
      name: 'courses',
      url: 'https://collections.amazingcms.amazingdesign.eu/api/actions/courses/:id',
      onError: (...all) => console.log('I am onError callback!', ...all),
      onStartFetching: (...all) => console.log('I am onStartFetching callback!', ...all),
      onStopFetching: (...all) => console.log('I am onStopFetching callback!', ...all),
      onReceivesData: (...all) => console.log('I am onReceivesData callback!', ...all),
      actionsDeclarations: crudActionsDeclarations,
    },
  ],
  axios
)

export default restServices