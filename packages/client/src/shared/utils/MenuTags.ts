import {IconType} from 'react-icons'
import {AiOutlineDashboard} from 'react-icons/ai'
import {FaRegBuilding} from 'react-icons/fa'
import {TiGroupOutline} from 'react-icons/ti'
import {BsLightning, BsBookmarkPlus, BsFileEarmarkText} from 'react-icons/bs'
import {RiGroupLine} from 'react-icons/ri'

export interface IDropdownItems {
  Name: string
  Link: string
}
export interface ITag {
  Title?: string
  Name: string
  Link?: string
  Icon: IconType
  DropdownItems: IDropdownItems[] | null
  Active?: boolean
}
export const Tags: ITag[] = [
  {
    Name: 'Dashboard',
    Icon: AiOutlineDashboard,
    DropdownItems: [
      {Name: 'Analytics', Link: '../dashboard'},
      {Name: 'Inventory', Link: '../dashboard/inventory'},
    ],
  },
  {
    Title: 'Pages',
    Name: 'Test',
    Link: 'test2',
    Icon: BsLightning,
    DropdownItems: null,
  },
  {
    Name: 'Employees',
    Icon: TiGroupOutline,
    DropdownItems: [
      {Name: 'Employee List', Link: 'dsad'},
      {Name: 'View Employee', Link: 'dasas'},
      {Name: 'New Employee', Link: 'dasd'},
      {Name: 'Any', Link: 'about'},
    ],
  },
  {
    Name: 'Departaments',
    Icon: FaRegBuilding,
    DropdownItems: [
      {Name: 'Employee List', Link: 'sadasd'},
      {Name: 'View Employee', Link: 'xx'},
      {Name: 'New Employee', Link: 'xxx'},
      {Name: 'Any', Link: 'dad'},
    ],
  },
  {
    Name: 'Products',
    Icon: BsLightning,
    DropdownItems: [
      {Name: 'Employee List', Link: 'asdaw'},
      {Name: 'View Employee', Link: 'adaewd'},
      {Name: 'New Employee', Link: 'fsafasd'},
      {Name: 'Any', Link: 'dasdasxc'},
    ],
  },
  {
    Name: 'Suppliers',
    Icon: BsBookmarkPlus,
    DropdownItems: [
      {Name: 'Employee List', Link: 'xcxv'},
      {Name: 'View Employee', Link: 'dasd'},
      {Name: 'New Employee', Link: 'xxe'},
      {Name: 'Any', Link: 'about'},
    ],
  },
  {
    Name: 'Contracts',
    Icon: BsFileEarmarkText,
    DropdownItems: [
      {Name: 'Employee List', Link: 'eqweq'},
      {Name: 'View Employee', Link: 'sdadwq'},
      {Name: 'New Employee', Link: 'dasdqw'},
      {Name: 'Any', Link: 'sdaqw'},
    ],
  },
  {
    Name: 'User List',
    Icon: RiGroupLine,
    DropdownItems: [
      {Name: 'Employee List', Link: 'dasd'},
      {Name: 'View Employee', Link: 'eqwe'},
      {Name: 'New Employee', Link: 'aboudawqt'},
      {Name: 'Any', Link: 'wqeqw'},
    ],
  },
]
