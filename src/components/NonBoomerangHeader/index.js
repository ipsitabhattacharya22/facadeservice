import React, {Component} from 'react'
import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
    Switcher, SwitcherItem, HeaderMenuButton, SkipToContent
  } from 'carbon-components-react/es/components/UIShell';
import './nonBoomerangHeader.scss';
import { SideNavItems, SideNavLink, SideNav, HeaderNavigation, HeaderMenuItem } from 'carbon-components-react';

class BoomerangHeader extends Component {
    constructor(props) {
	    super(props);
        this.state = {
            isSideNavExpanded : false
        }
    }

    onSideNavMenuClick() {
        this.setState({isSideNavExpanded : !this.state.isSideNavExpanded});
    }

    render() {
        return(
            <div class="non-bmrg-header" style={this.props.customHeaderStyle}>
                <Header aria-label="header">
                    <SkipToContent/>
                    {this.props.hasSideNav ? 
                        <HeaderMenuButton
                        aria-label="Open menu"
                        isCollapsible
                        onClick={() => this.onSideNavMenuClick()}
                        isActive={this.state.isSideNavExpanded}
                        /> : '' 
                    }
                    <HeaderName href={this.props.logoLink} prefix="IBM">
                        {this.props.productName}
                    </HeaderName>
                    {this.props.hasHeaderLogo ?
                        <div className="header-text-container">
                            <div className="header-logo" style={{backgroundImage: 'url('+this.props.headerLogo+')'}}></div>
                            <div className="header-text">{this.props.headerText}</div>
                        </div>
                    : ''}
                    {this.props.navigation && this.props.navigation.length > 0 ?
                        <HeaderNavigation>
                            {
                                this.props.navigation.map((nav, index) => {
                                    return(
                                        <HeaderMenuItem key={index} href={nav.url}>{nav.name}</HeaderMenuItem>
                                    )
                                })
                            }
                        </HeaderNavigation>
                    :''}
                    <HeaderGlobalBar>
                    {
                        this.props.headerIcons ? 
                        this.props.headerIcons.map((icon, index) => {
                            return (
                                <HeaderGlobalAction ref={icon.iconContainer || null} key={index} onClick={(event) => this.props.onIconClick(event, icon.name)} aria-label={icon.ariaLabel}>
                                    {icon.icon}
                                </HeaderGlobalAction>
                            )
                        })
                        : ''
                    }
                    </HeaderGlobalBar>
                    <HeaderPanel aria-label="Header Panel" ref={this.props.refContainer} expanded={this.props.headerPanel.expanded} style={this.props.headerPanel.properties}>
                        <Switcher aria-label="Switcher Container">
                            {this.props.headerPanel.links.length > 0? 
                            this.props.headerPanel.links.map((link,index) => {
                                if(link.path !== '') {
                                    return (
                                        <div className="headerpanel-switcher">
                                            <SwitcherItem aria-label={link.name} href={link.path}>
                                                {link.name}
                                            </SwitcherItem>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="headerpanel-switcher">
                                            <SwitcherItem aria-label={link.name} onClick={(event) => this.props.onSwitcherItemClick(event, link.name)}>
                                                {link.name}
                                            </SwitcherItem>
                                        </div>
                                    )
                                }
                                }) : ''
                            }
                        </Switcher>
                    </HeaderPanel>
                    {this.props.hasSideNav ?
                        <SideNav aria-label="Side navigation" isRail expanded={this.state.isSideNavExpanded}>
                        <SideNavItems>
                            {this.props.sideNavItems && this.props.sideNavItems.length > 0 ? 
                                this.props.sideNavItems.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <SideNavLink element={item.elementType || 'a'} href={item.pathName || '/'} isActive={item.isActive || false} renderIcon={item.renderIcon || null}>
                                                {item.label}
                                            </SideNavLink>
                                        </div>
                                    )
                            }) : ''}
                        </SideNavItems>
                        </SideNav> : '' 
                    }
                </Header>
            </div>
        )
    }
}

export default BoomerangHeader