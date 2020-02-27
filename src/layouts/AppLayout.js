import React, { useEffect, useState, Fragment } from 'react'
import menus from '../assets/menus'
import {
    Layout,
    Menu,
    Icon,
    Spin
} from 'antd'
const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

import loadable from "@loadable/component"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    useLocation,
    useHistory
} from 'react-router-dom'

const Loading = () => <Spin size="large" />
const LoadableHomeComponent = loadable(() => import("../pages/home"), {
    fallback: <Loading />
})
const LoadableNotFoundComponent = loadable(() => import("../pages/404"), {
    fallback: <Loading />
})

const MainContent = () => {
    return (
        <Switch>
            <Route exact path="/">
                <LoadableHomeComponent />
            </Route>
            <Route path="*">
                <LoadableNotFoundComponent />
            </Route>
        </Switch>
    )
}

const AppMenu = props => {
    const [openKeys, setOpenKeys] = useState([''])
    const [selectKeys, setSelectKeys] = useState([''])
    let location = useLocation()
    useEffect(() => {
        //current menu
        const current = menus.find(f => f.path == location.pathname)
        if (current) {
            setSelectKeys([current.menuId])
            const keys = getAllOpenKeys(current)
            setOpenKeys(keys)
        }
    }, [location])

    const menuSort = (a, b) => {
        if (a.order == b.order && a.name == b.name) return 0
        if (a.order < b.order) return -1
        else if (a.order > b.order) return 1
        if (a.name < b.name) return -1
        else if (a.name > b.name) return 1
    }

    const renderMenus = (id) => {
        const menuItem = menus.find(f => f.menuId == id)
        if (!menuItem) return null
        const submenus = menus.filter(f => f.parentMenuId == id).sort(menuSort)

        return renderMenuItem(menuItem, submenus)
    }
    const renderMenuItem = (menu, submenus) => {
        return submenus && submenus.length ? (
            <SubMenu
                key={menu.menuId}
                title={
                    <span>
                        {menu.icon && <Icon type={menu.icon} />}
                        <span>{menu.name}</span>
                    </span>
                }
                onTitleClick={({ key }) => {
                    if (openKeys.includes(key)) {
                        setOpenKeys(openKeys.filter(f => f != key))
                    } else {
                        setOpenKeys([key])
                    }
                }}
            >
                {
                    submenus.map((item, index) => renderMenus(item.menuId))
                }
            </SubMenu>
        ) : <Menu.Item key={menu.menuId}>
                <NavLink to={menu.path}>
                    {menu.name}
                </NavLink>
            </Menu.Item>
    }

    const getAllOpenKeys = current => {
        const getParentSub = (menu, keys) => {
            const parentSub = menus.find(f => f.menuId == menu.parentMenuId)
            if (parentSub) {
                keys.push(parentSub.menuId)
                return getParentSub(parentSub, keys)
            }
            return keys
        }

        return getParentSub(current, [])
    }

    const root = menus.find(f => f.isRoot)

    return (
        <Menu theme="dark"
            mode="inline"
            selectedKeys={selectKeys}
            openKeys={openKeys}
        >
            {
                menus.filter(f => f.parentMenuId == root.menuId)
                    .sort(menuSort)
                    .map(item => renderMenus(item.menuId))
            }
        </Menu>
    )
}

const AppLayout = ({ children }) => {

    const [collapsed, setCollapsed] = useState(false)

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    trigger={null} collapsedWidth="0" collapsible collapsed={collapsed}
                >
                    <div className="logo" />
                    <AppMenu />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={() => {
                                setCollapsed(!collapsed)
                            }}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: "100%" }}>
                            <MainContent />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>©{new Date().getFullYear()} Created by Duy Nguyễn</Footer>
                </Layout>
            </Layout>
        </Router>
    )
}
export default AppLayout