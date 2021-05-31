import React, { useState } from 'react'
import NonBoomerangHeader from './index.js'
import { withKnobs, text } from '@storybook/addon-knobs'
import {Search20, Notification20, User20} from '@carbon/icons-react';
import { useEffect } from 'react';
export default { title: 'IAW App Header', decorators: [withKnobs]}
import headerLogo from "../../assets/images/Agent-assist-logo.png";


export const nonBoomerangHeader = (props) => {
  const container = React.createRef();
  const iconContainer = React.createRef();
  const [headerConfig, setHeaderConfig] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const [headerPanel, setHeaderPanel] = useState(
    {
      expanded: false,
      properties: {
        height: "max-content",
        paddingBottom: "1rem",
        paddingTop: "1rem"
      },
      links: [
        {name: 'Ipsita Bhattacharyya', path: ''},
        {name: 'Logout', path: '#'}
      ]
    }
  );

  const customHeaderStyle = {
      backgroundColor: "#ffffff",
      color: "#171717"
  }

  const onIconClick = (e, iconName) => {
    console.log("Clicked icon = ", iconName);
    if(iconName === 'User') {
      let header = {...headerPanel};
      header.expanded = !header.expanded;
      setHeaderPanel(header);
    }
  }

  const onSwitcherItemClick = (e, linkName) => {
    console.log("Clicked link = ", linkName);
  }

  const headerIcons = [
    {
      icon: <Notification20/>,
      ariaLabel: "Notification",
      name: "Notification"
    },
    {
      icon: <User20/>,
      ariaLabel: "User",
      name: "User",
      iconContainer: iconContainer
    }
  ];

  const handleClickOutside = (event) => {
    if (
      container.current &&
      !container.current.contains(event.target) && iconContainer.current &&
      !iconContainer.current.contains(event.target)
    ) {
      let header = {...headerPanel};
      header.expanded = false;
      setHeaderPanel(header);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  const sideNavItems = [
    {
      label: "Activities",
      pathName: "https://www.google.com"
    },
    {
      label: "Document Management",
      pathName: "#",
      renderIcon: Notification20
    }
  ]

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

  return <NonBoomerangHeader 
    customHeaderStyle={customHeaderStyle} 
    headerIcons={headerIcons} 
    onIconClick={onIconClick} 
    productName="Automation Platform"
    logoLink="#" 
    headerPanel={headerPanel}
    onSwitcherItemClick={onSwitcherItemClick}
    refContainer={container}
    hasHeaderLogo={true}
    headerLogo={headerLogo}
    headerText="Agent Assist"
    hasSideNav={true}
    isSideNavOpen={true}
    sideNavItems={sideNavItems}
    navigation={navigation}
  />
}
