import React from 'react'
import {
    SidebarPusher,
    SidebarPushable,
    MenuItem,
    GridColumn,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react'

// TODO: could be that it's only in semantic-ui-react-3 -> beta

const AppSidebar = () => {

    const [visible, setVisible] = React.useState(false)
    return (
        <Grid columns={1}>
            <GridColumn>
                <Checkbox
                    checked={visible}
                    label={"visible"}
                    onChange={(e, data) => setVisible(data.checked)}
                />
            </GridColumn>
            <GridColumn>
                <SidebarPushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={() => setVisible(false)}
                        vertical
                        visible={visible}
                        width='thin'
                    >
                        <MenuItem as='a'>
                            <Icon name='home' />
                            Home
                        </MenuItem>
                        <MenuItem as='a'>
                            <Icon name='gamepad' />
                            Games
                        </MenuItem>
                        <MenuItem as='a'>
                            <Icon name='camera' />
                            Channels
                        </MenuItem>
                    </Sidebar>

                    <SidebarPusher>
                        <Segment basic>
                            <Header as='h3'>Application Content</Header>
                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        </Segment>
                    </SidebarPusher>
                </SidebarPushable>
            </GridColumn>
        </Grid>
    )
}

export default AppSidebar