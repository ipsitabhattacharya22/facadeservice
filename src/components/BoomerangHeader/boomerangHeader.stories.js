import React, { useState } from 'react'
import BoomerangHeader from './index.js'
import { withKnobs, text } from '@storybook/addon-knobs'
import { Dashboard16, Dashboard24, Notification24 } from '@carbon/icons-react'
export default { title: 'IAW App Header', decorators: [withKnobs]}
import headerLogo from "../../assets/images/Agent-assist-logo.png";


export const boomerangHeader = (props) => {
  const [headerConfig, setHeaderConfig] = useState({});
  const [userDetail, setUserDetail] = useState({});

  const customHeaderStyle = {
      backgroundColor: "#ffffff",
      color: "#171717"
  }

  const componentDidMount = () => {
    console.log("This is the custom header");
  }

  const bmrgCustomIcons = [
    {
      icon: <Dashboard24/>,
      ariaLabel: "Dashboard",
      name: "Dashboard"
    },
    {
      icon: <Notification24/>,
      ariaLabel: "Notification",
      name: "Notification"
    }
  ]

  const sideNavItems = [
    {
      label: "Activities",
      pathName: "https://www.google.com"
    },
    {
      label: "Document Management",
      pathName: "#",
      renderIcon: Dashboard24
    }
  ]

  const onIconClick = (e, iconName) => {
    console.log("Clicked icon = ", iconName);
    if(iconName === 'Dashboard') {
      console.log("Dashboard clicked");
    }
  }

  const navigation = [
    {
      name: 'Menu 1',
      url: 'https://www.google.com'
    },
    {
      name: 'Menu 2',
      url: 'https://www.facebook.com'
    }
  ]

  return <BoomerangHeader 
  customHeaderStyle={customHeaderStyle} 
  componentDidMount={componentDidMount} 
  productName="Automation Platform" 
  headerConfig={headerConfig} 
  userDetail={userDetail} 
  bmrgCustomIcons={bmrgCustomIcons} 
  onIconClick={onIconClick} 
  hasHeaderLogo={true}
  headerLogo={headerLogo}
  headerText="Agent Assist"
  hasSideNav={true}
  isSideNavOpen={true}
  logoLink="#"
  sideNavItems={sideNavItems}
  navigation={navigation}
  />
}
