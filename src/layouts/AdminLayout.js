import React from 'react'
import PropTypes from 'prop-types'

import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import MenuRounded from '@material-ui/icons/MenuRounded'

import {
  Root,
  Header,
  Nav,
  Content,
  Footer,
  presets,
} from 'mui-layout'

const config = presets.createStandardLayout()

const AdminLayout = ({ header, nav, content, footer }) => (
  <Root config={config}>
    <Header
      renderMenuIcon={open => (open ? <ChevronLeft /> : <MenuRounded />)}
    >
      {header}
    </Header>
    <Nav
      renderIcon={collapsed => collapsed ? <ChevronRight /> : <ChevronLeft />}
    >
      {nav}
    </Nav>
    <Content>
      {content}
    </Content>
    <Footer>
      {footer}
    </Footer>
  </Root>
)

AdminLayout.propTypes = {
  header: PropTypes.node,
  nav: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
}

export default AdminLayout