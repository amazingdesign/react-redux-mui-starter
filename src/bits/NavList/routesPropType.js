import PropTypes from 'prop-types'

export const routesPropType = PropTypes.arrayOf(
  PropTypes.exact({
    type: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string.isRequired,
    pathWithParams: PropTypes.string,
    path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
    icon: PropTypes.string,
    separator: PropTypes.shape({
      above: PropTypes.bool,
      below: PropTypes.bool,
    }),
    link: PropTypes.string,
    routes: PropTypes.array,
    isSelected: PropTypes.bool,
    isOpen: PropTypes.bool,
    onClick: PropTypes.func,
  }),
)

export default routesPropType