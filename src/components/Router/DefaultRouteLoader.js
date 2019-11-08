import React from 'react'

import LoadingIndicator from '../LoadingIndictor'

const DefaultRouteLoader = (props) => (
  <LoadingIndicator 
    message={'Wczytywanie zawartości...'}
  />
)

export default DefaultRouteLoader