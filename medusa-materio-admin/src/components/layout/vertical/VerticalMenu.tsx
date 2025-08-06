// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: { scrollMenu: (container: any, isPerfectScrollbar: boolean) => void }) => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <MenuItem href='/dashboard' icon={<i className='ri-dashboard-line' />}>
          Dashboard
        </MenuItem>
        
        <MenuItem href='/catalogs' icon={<i className='ri-book-open-line' />}>
          Catalogs
        </MenuItem>
        
        <MenuItem href='/sales' icon={<i className='ri-money-dollar-circle-line' />}>
          Sales
        </MenuItem>
        
        <MenuItem href='/customers' icon={<i className='ri-user-line' />}>
          Customers
        </MenuItem>
        
        <MenuItem href='/vendors' icon={<i className='ri-group-line' />}>
          Vendors
        </MenuItem>
        
        <MenuItem href='/stores' icon={<i className='ri-store-line' />}>
          Stores
        </MenuItem>
        
        <MenuItem href='/approvals' icon={<i className='ri-checkbox-circle-line' />}>
          Approvals
        </MenuItem>
        
        <MenuItem href='/marketing' icon={<i className='ri-megaphone-line' />}>
          Marketing
        </MenuItem>
        
        <MenuItem href='/reports' icon={<i className='ri-file-chart-line' />}>
          Reports
        </MenuItem>
        
        <MenuItem href='/appearance' icon={<i className='ri-palette-line' />}>
          Appearance
        </MenuItem>
        
        <MenuItem href='/extensions' icon={<i className='ri-puzzle-line' />}>
          Extensions
        </MenuItem>
        
        <MenuItem href='/localstation' icon={<i className='ri-map-pin-line' />}>
          LocalStation
        </MenuItem>
        
        <MenuItem href='/wallets' icon={<i className='ri-wallet-line' />}>
          Wallets
        </MenuItem>
        
        <MenuItem href='/system' icon={<i className='ri-settings-line' />}>
          System
        </MenuItem>
        
        <MenuItem href='/tools' icon={<i className='ri-tools-line' />}>
          Tools
        </MenuItem>
        
        <MenuItem href='/collapse' icon={<i className='ri-arrow-left-right-line' />}>
          Collapse
        </MenuItem>

        <MenuSection label='Original Features'>
          <SubMenu
            label='Medusa Dashboard'
            icon={<i className='ri-home-smile-line' />}
          >
            <MenuItem href='/'>Analytics Overview</MenuItem>
            <MenuItem href='/medusa-dashboard'>Medusa Dashboard</MenuItem>
          </SubMenu>
          
          <MenuItem href='/account-settings' icon={<i className='ri-user-settings-line' />}>
            Account Settings
          </MenuItem>
          
          <MenuItem href='/form-layouts' icon={<i className='ri-layout-4-line' />}>
            Form Layouts
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
