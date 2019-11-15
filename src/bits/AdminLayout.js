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

const AdminLayout = (props) => (
  <Root config={config}>
    <Header
      renderMenuIcon={open => (open ? <ChevronLeft /> : <MenuRounded />)}
      {...props.headerProps}
    >
      {props.header}
    </Header>
    <Nav
      renderIcon={collapsed => collapsed ? <ChevronRight /> : <ChevronLeft />}
      {...props.navProps}
    >
      {props.nav}
    </Nav>
    <Content {...props.contentProps}>
      {props.content}
    </Content>
    <Footer {...props.footerProps}>
      {props.footer}
    </Footer>
  </Root>
)

AdminLayout.propTypes = {
  header: PropTypes.node,
  nav: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  content: PropTypes.node,
  footer: PropTypes.node,
  headerProps: PropTypes.object,
  navProps: PropTypes.object,
  contentProps: PropTypes.object,
  footerProps: PropTypes.object,
}

export default AdminLayout