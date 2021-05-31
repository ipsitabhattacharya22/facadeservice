import React,{Component, Suspense, lazy} from 'react'
import NonBoomerangHeader from '../NonBoomerangHeader/index';

class CustomHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            environment:'development'
        }
    }

    renderDynamicHeader() {
        let {
                project, 
                headerText, 
                refContainer, 
                productName, 
                customHeaderStyle, 
                logoutLink, 
                onSwitcherItemClick, 
                headerPanel, 
                onIconClick, 
                logoLink, 
                headerIcons, 
                navigation, 
                baseURL, 
                features, 
                platform, 
                bmrgCustomIcons, 
                hasHeaderLogo, 
                headerLogo,
                hasSideNav,
                isSideNavOpen,
                sideNavItems
            } = this.props;
        let {environment} = this.props;
        if(environment !== 'boomerang' && environment !== 'production' && environment !== undefined) {
            return <NonBoomerangHeader 
                        environment={environment} 
                        headerText={headerText} 
                        selectedProject={project} 
                        productName={productName} 
                        customHeaderStyle={customHeaderStyle} 
                        logoutLink={logoutLink} 
                        onSwitcherItemClick={onSwitcherItemClick} 
                        onSwitcherItemClick={onSwitcherItemClick} 
                        headerPanel={headerPanel} 
                        onIconClick={onIconClick} 
                        logoLink={logoLink} 
                        headerIcons={headerIcons} 
                        hasHeaderLogo={hasHeaderLogo} 
                        headerLogo={headerLogo} 
                        refContainer={refContainer}
                        hasSideNav={hasSideNav}
                        isSideNavOpen={isSideNavOpen}
                        sideNavItems={sideNavItems}
                    />
        } else {
            const BoomerangHeader = lazy(() => import(/* webpackChunkName: "BoomerangHeader" */ "../BoomerangHeader/index"));
            return (
                <Suspense fallback={
                    <NonBoomerangHeader 
                        environment={environment} 
                        headerText={headerText} 
                        selectedProject={project} 
                        productName={productName} 
                        customHeaderStyle={customHeaderStyle} 
                        logoutLink={logoutLink} 
                        onSwitcherItemClick={onSwitcherItemClick} 
                        onSwitcherItemClick={onSwitcherItemClick} 
                        headerPanel={headerPanel} 
                        onIconClick={onIconClick} 
                        logoLink={logoLink} 
                        headerIcons={headerIcons} 
                        hasHeaderLogo={hasHeaderLogo} 
                        headerLogo={headerLogo} 
                        refContainer={refContainer}
                        hasSideNav={hasSideNav}
                        isSideNavOpen={isSideNavOpen}
                        sideNavItems={sideNavItems}
                    />}>
                  <BoomerangHeader 
                    environment={environment} 
                    headerText={headerText} 
                    selectedProject={project} 
                    productName={productName} 
                    customHeaderStyle={customHeaderStyle} 
                    logoutLink={logoutLink} 
                    navigation={navigation ? navigation : undefined} 
                    baseURL={baseURL? baseURL : undefined} 
                    features={features? features : undefined} 
                    platform={platform ? platform : undefined} 
                    bmrgCustomIcons={bmrgCustomIcons} 
                    onIconClick={onIconClick} 
                    hasHeaderLogo={hasHeaderLogo} 
                    headerLogo={headerLogo}
                    hasSideNav={hasSideNav}
                    isSideNavOpen={isSideNavOpen}
                    sideNavItems={sideNavItems}
                />
                </Suspense>
            );
        }
    }

    render() {
        let headerComponent = this.renderDynamicHeader();
        return(
            <div>
                {headerComponent}
            </div>
        )
    }
}

export default CustomHeader
