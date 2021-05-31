import React, {Component} from 'react'
import {UIShell, LeftSideNav} from '@boomerang/carbon-addons-boomerang-react';
import {
    SideNav,
    SideNavLink,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    Link
} from 'carbon-components-react';
import axios from 'axios';
import './boomerangHeader.scss';

class BoomerangHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerConfigData: {},
            userDetail: {},
            baseUrl: 'https://fra6.cloud.boomerangplatform.net/uat/services',
        }
    }

    componentDidMount() {
        let baseURL;
        let baseLink = window.location.href;
        if(this.props.baseURL &&  this.props.baseURL !== undefined) {
            baseURL = this.props.baseURL;
        } else if(baseLink.indexOf('rtp4.cloud.boomerangplatform.net/dev/') > -1) {
            baseURL = 'https://rtp4.cloud.boomerangplatform.net/dev/services';
        } else if(baseLink.indexOf('rtp4.cloud.boomerangplatform.net/qa/') > -1) {
            baseURL = 'https://rtp4.cloud.boomerangplatform.net/qa/services';
        } else {
            baseURL = 'https://fra6.cloud.boomerangplatform.net/uat/services';
        }
        this.setState({baseUrl: baseURL});
        let headerConfigData = {}
        let userDetail = {}
        let header = {
            navigation: this.props.navigation && this.props.navigation !== undefined ? this.props.navigation : [],
            features: this.props.features && this.props.features !== undefined? this.props.features : {'notification.enabled': false},
            platform: this.props.platform && this.props.platform !== undefined ? this.props.platform : {}
        }
        const user = {
            "id": "5cbffa1f6dc91f00015bc3c4",
            "isFirstVisit": false,
            "type": "user",
            "isShowHelp": true,
            "firstLoginDate": 1556085279902,
            "lastLoginDate": 1568807353953,
                "lowerLevelGroupIds": [
                "5ca4524a6008a3000111f58a",
            "5ca47cf16008a3000111f7f3",
            "5ca463cb6008a3000111f728"
            ],
            "pinnedToolIds": [],
                "favoritePackages": [],
                "personalizations": {},
                "notificationSettings": {},
            "status": "active",
            "projects": null,
            "teams": null,
            "hasConsented": true,
            "name":"Welcome User"
        }
        headerConfigData = Object.assign({}, header)
        userDetail = Object.assign({}, user)
        this.setState({
        headerConfigData: headerConfigData,
            userDetail : userDetail
        })

        //Fetch user
        let profileServices = baseURL + '/users/profile';
        let navigationServices = baseURL + '/users/navigation';
        axios.get(profileServices)
        .then((response) => {
            userDetail = Object.assign({}, response.data)
            this.setState({
                userDetail : userDetail
            })
        }).catch((error) => {
        console.log(error);
        });

        //Fetch header configuration details
        axios.get(navigationServices)
        .then((response) => {
            headerConfigData= Object.assign({}, response.data)
            if(this.props.logoutLink) {
                headerConfigData.platform.signOutUrl = this.props.logoutLink;
            }
            if(this.props.navigation) {
                headerConfigData.navigation = this.props.navigation;
            } else {
                headerConfigData.navigation = [];
            }
            if(this.props.features) {
                headerConfigData.features = this.props.features;
            } else {
                headerConfigData.features['notifications.enabled'] = false;
            }
            this.setState({
                headerConfigData: headerConfigData,
            })
        }).catch((error) => {
        console.log(error);
        });
    }

    setSideNav(props){
        if(props.hasSideNav) {
            return (
                <LeftSideNav>
                  <SideNav expanded isChildOfHeader aria-label="sidenav">
                    <SideNavItems>
                        {props.sideNavItems && props.sideNavItems.length > 0 ? 
                            props.sideNavItems.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <SideNavLink element={item.elementType || 'a'} href={item.pathName || '/'} isActive={item.isActive || false} renderIcon={item.renderIcon || null}>
                                            {item.label}
                                        </SideNavLink>
                                    </div>
                                )
                        }) : ''}
                    </SideNavItems>
                  </SideNav>
                </LeftSideNav>
            )
        } else {
            return null;
        }
    }
    
    render() {
        let headerName = 
        <div className="bmrg-header-name-container">
            <div className="product-name"><Link className="no-link-style" href={this.props.logoLink || '#'}>IBM <strong className="margin-half">{this.props.productName}</strong></Link></div>
            {this.props.hasHeaderLogo ?
                <div className="header-text-container">
                    <div className="header-logo" style={{backgroundImage: 'url('+this.props.headerLogo+')'}}></div>
                    <div className="header-text">{this.props.headerText}</div>
                </div>
            : ''}
        </div>
        return(
            <div className="bmrg-header-custom" style={this.props.customHeaderStyle}>
                <div className="bmrg-custom-header-section">
                {
                    this.props.bmrgCustomIcons && this.props.bmrgCustomIcons.length > 0 ? 
                    this.props.bmrgCustomIcons.map((icon, index) => {
                        return (
                            <div className="bmrg-custom-icon" key={index} onClick={(event) => this.props.onIconClick(event, icon.name)} aria-label={icon.ariaLabel}>
                                {icon.icon}
                            </div>
                        )
                    }) : ''
                }
                </div>
                <UIShell
                    style={this.props.customHeaderStyle}
                    baseServiceUrl={this.state.baseUrl}
                    productName={headerName}
                    headerConfig={this.state.headerConfigData}
                    user={this.state.userDetail}
                    renderSidenav={this.props.hasSideNav ? () => this.setSideNav(this.props) : null}
                /> 
            </div>
        )
    }
}

export default BoomerangHeader