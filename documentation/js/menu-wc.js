'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">cloud-back documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-d2945d86ff10473600e1dede598232495eb5ea2e24d02be8574ca8b120f3c590cdb7811c27e18e83cc66928f93afddc1a5e330f6ca9e0d950bfcc977355d81e4"' : 'data-bs-target="#xs-controllers-links-module-AppModule-d2945d86ff10473600e1dede598232495eb5ea2e24d02be8574ca8b120f3c590cdb7811c27e18e83cc66928f93afddc1a5e330f6ca9e0d950bfcc977355d81e4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d2945d86ff10473600e1dede598232495eb5ea2e24d02be8574ca8b120f3c590cdb7811c27e18e83cc66928f93afddc1a5e330f6ca9e0d950bfcc977355d81e4"' :
                                            'id="xs-controllers-links-module-AppModule-d2945d86ff10473600e1dede598232495eb5ea2e24d02be8574ca8b120f3c590cdb7811c27e18e83cc66928f93afddc1a5e330f6ca9e0d950bfcc977355d81e4"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-e440b6728ecd0d00052fb5e1e9e46cb0de19ad1f27f65b17cf0e21622e6f0eccd6f179d347b963137e465cd15f7d971910f402d4c9832627dbec68c7918c2132"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-e440b6728ecd0d00052fb5e1e9e46cb0de19ad1f27f65b17cf0e21622e6f0eccd6f179d347b963137e465cd15f7d971910f402d4c9832627dbec68c7918c2132"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-e440b6728ecd0d00052fb5e1e9e46cb0de19ad1f27f65b17cf0e21622e6f0eccd6f179d347b963137e465cd15f7d971910f402d4c9832627dbec68c7918c2132"' :
                                        'id="xs-injectables-links-module-AuthModule-e440b6728ecd0d00052fb5e1e9e46cb0de19ad1f27f65b17cf0e21622e6f0eccd6f179d347b963137e465cd15f7d971910f402d4c9832627dbec68c7918c2132"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CredentialModule.html" data-type="entity-link" >CredentialModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CredentialModule-0ba3ea09e2fac954a720651ece8e7776a50eed6e0e1981dfd9dcad7f6d4c3457bbc8b3c94e7094f74473277c2fec7957274cc54bf57330514fe01a5eebaa5add"' : 'data-bs-target="#xs-injectables-links-module-CredentialModule-0ba3ea09e2fac954a720651ece8e7776a50eed6e0e1981dfd9dcad7f6d4c3457bbc8b3c94e7094f74473277c2fec7957274cc54bf57330514fe01a5eebaa5add"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CredentialModule-0ba3ea09e2fac954a720651ece8e7776a50eed6e0e1981dfd9dcad7f6d4c3457bbc8b3c94e7094f74473277c2fec7957274cc54bf57330514fe01a5eebaa5add"' :
                                        'id="xs-injectables-links-module-CredentialModule-0ba3ea09e2fac954a720651ece8e7776a50eed6e0e1981dfd9dcad7f6d4c3457bbc8b3c94e7094f74473277c2fec7957274cc54bf57330514fe01a5eebaa5add"' }>
                                        <li class="link">
                                            <a href="injectables/CredentialService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CredentialService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProfileModule-cac9cbfa5db96e34664f62bb627a5255ebdae000f93f85365312443be814cfb16f56fc59cc7cf9443c0cb46f9dcf10f3c2f34685a673e499c1096449d5e4c710"' : 'data-bs-target="#xs-controllers-links-module-ProfileModule-cac9cbfa5db96e34664f62bb627a5255ebdae000f93f85365312443be814cfb16f56fc59cc7cf9443c0cb46f9dcf10f3c2f34685a673e499c1096449d5e4c710"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProfileModule-cac9cbfa5db96e34664f62bb627a5255ebdae000f93f85365312443be814cfb16f56fc59cc7cf9443c0cb46f9dcf10f3c2f34685a673e499c1096449d5e4c710"' :
                                            'id="xs-controllers-links-module-ProfileModule-cac9cbfa5db96e34664f62bb627a5255ebdae000f93f85365312443be814cfb16f56fc59cc7cf9443c0cb46f9dcf10f3c2f34685a673e499c1096449d5e4c710"' }>
                                            <li class="link">
                                                <a href="controllers/ProfileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProfileModule-cac9cbfa5db96e34664f62bb627a5255ebdae000f93f85365312443be814cfb16f56fc59cc7cf9443c0cb46f9dcf10f3c2f34685a673e499c1096449d5e4c710"' : 'data-bs-target="#xs-injectables-links-module-ProfileModule-cac9cbfa5db96e34664f62bb627a5255ebdae000f93f85365312443be814cfb16f56fc59cc7cf9443c0cb46f9dcf10f3c2f34685a673e499c1096449d5e4c710"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-cac9cbfa5db96e34664f62bb627a5255ebdae000f93f85365312443be814cfb16f56fc59cc7cf9443c0cb46f9dcf10f3c2f34685a673e499c1096449d5e4c710"' :
                                        'id="xs-injectables-links-module-ProfileModule-cac9cbfa5db96e34664f62bb627a5255ebdae000f93f85365312443be814cfb16f56fc59cc7cf9443c0cb46f9dcf10f3c2f34685a673e499c1096449d5e4c710"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-d42dbff0753bf71dc928d36c9ddacd695fc6894b7b0e35232a233c2fc3a093e8bd91ca689c225ab5e62b84db03d628eefe1b2786cfc7f2f44933a38a8ffba0ff"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-d42dbff0753bf71dc928d36c9ddacd695fc6894b7b0e35232a233c2fc3a093e8bd91ca689c225ab5e62b84db03d628eefe1b2786cfc7f2f44933a38a8ffba0ff"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-d42dbff0753bf71dc928d36c9ddacd695fc6894b7b0e35232a233c2fc3a093e8bd91ca689c225ab5e62b84db03d628eefe1b2786cfc7f2f44933a38a8ffba0ff"' :
                                        'id="xs-injectables-links-module-RolesModule-d42dbff0753bf71dc928d36c9ddacd695fc6894b7b0e35232a233c2fc3a093e8bd91ca689c225ab5e62b84db03d628eefe1b2786cfc7f2f44933a38a8ffba0ff"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-7b2e99b490b5eb5225d5a10c333c3343986b8eb57cd1d9f52065775645bdeebfe3a81320de5038d72c7a090bbbabe280bb40d8f7766043fbc7317487ffa7d3e0"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-7b2e99b490b5eb5225d5a10c333c3343986b8eb57cd1d9f52065775645bdeebfe3a81320de5038d72c7a090bbbabe280bb40d8f7766043fbc7317487ffa7d3e0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-7b2e99b490b5eb5225d5a10c333c3343986b8eb57cd1d9f52065775645bdeebfe3a81320de5038d72c7a090bbbabe280bb40d8f7766043fbc7317487ffa7d3e0"' :
                                            'id="xs-controllers-links-module-UsersModule-7b2e99b490b5eb5225d5a10c333c3343986b8eb57cd1d9f52065775645bdeebfe3a81320de5038d72c7a090bbbabe280bb40d8f7766043fbc7317487ffa7d3e0"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-7b2e99b490b5eb5225d5a10c333c3343986b8eb57cd1d9f52065775645bdeebfe3a81320de5038d72c7a090bbbabe280bb40d8f7766043fbc7317487ffa7d3e0"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-7b2e99b490b5eb5225d5a10c333c3343986b8eb57cd1d9f52065775645bdeebfe3a81320de5038d72c7a090bbbabe280bb40d8f7766043fbc7317487ffa7d3e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-7b2e99b490b5eb5225d5a10c333c3343986b8eb57cd1d9f52065775645bdeebfe3a81320de5038d72c7a090bbbabe280bb40d8f7766043fbc7317487ffa7d3e0"' :
                                        'id="xs-injectables-links-module-UsersModule-7b2e99b490b5eb5225d5a10c333c3343986b8eb57cd1d9f52065775645bdeebfe3a81320de5038d72c7a090bbbabe280bb40d8f7766043fbc7317487ffa7d3e0"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProfileController.html" data-type="entity-link" >ProfileController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Credentials.html" data-type="entity-link" >Credentials</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RefreshToken.html" data-type="entity-link" >RefreshToken</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Roles.html" data-type="entity-link" >Roles</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Users.html" data-type="entity-link" >Users</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatedSimpleUserDto.html" data-type="entity-link" >CreatedSimpleUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CredentialDto.html" data-type="entity-link" >CredentialDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomAndAddRoles1729176213783.html" data-type="entity-link" >CustomAndAddRoles1729176213783</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirstDatabaseModeled1729022289747.html" data-type="entity-link" >FirstDatabaseModeled1729022289747</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshToken1729265639063.html" data-type="entity-link" >RefreshToken1729265639063</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSessionDto.html" data-type="entity-link" >UserSessionDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CredentialService.html" data-type="entity-link" >CredentialService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link" >ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});