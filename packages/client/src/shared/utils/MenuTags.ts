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
  BaseUrl?: string
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
      {Name: 'Analytics', Link: ''},
      {Name: 'Inventory', Link: 'inventory'},
    ],
  },
  {
    Title: 'Pages',
    Name: 'Departamentos',
    Icon: FaRegBuilding,
    Link: 'departaments',
    DropdownItems: null,
  },
  {
    Name: '..',
    Icon: TiGroupOutline,
    DropdownItems: [
      {Name: 'Employee List', Link: 'dsad'},
      {Name: 'View Employee', Link: 'dasas'},
      {Name: 'New Employee', Link: 'dasd'},
      {Name: 'Any', Link: 'about'},
    ],
  },
  {
    Name: '....',
    Icon: BsLightning,
    DropdownItems: [
      {Name: 'Employee List', Link: 'asdaw'},
      {Name: 'View Employee', Link: 'adaewd'},
      {Name: 'New Employee', Link: 'fsafasd'},
      {Name: 'Any', Link: 'dasdasxc'},
    ],
  },
  {
    Name: '.....',
    Icon: BsBookmarkPlus,
    DropdownItems: [
      {Name: 'Employee List', Link: 'xcxv'},
      {Name: 'View Employee', Link: 'dasd'},
      {Name: 'New Employee', Link: 'xxe'},
      {Name: 'Any', Link: 'about'},
    ],
  },
  {
    Name: '......',
    Icon: BsFileEarmarkText,
    DropdownItems: [
      {Name: 'Employee List', Link: 'eqweq'},
      {Name: 'View Employee', Link: 'sdadwq'},
      {Name: 'New Employee', Link: 'dasdqw'},
      {Name: 'Any', Link: 'sdaqw'},
    ],
  },
  {
    Name: '.........',
    Icon: RiGroupLine,
    DropdownItems: [
      {Name: 'Employee List', Link: 'dasd'},
      {Name: 'View Employee', Link: 'eqwe'},
      {Name: 'New Employee', Link: 'aboudawqt'},
      {Name: 'Any', Link: 'wqeqw'},
    ],
  },
]

export const allVerticalLinks = [
  'dashboard',
  'inventory',
  'test2',
  'dsad',
  'dasas',
]

export const TagHorizontal: ITag[] = [
  {
    Name: 'Dashboard',
    Link: '../dashboard',
    Icon: AiOutlineDashboard,
    DropdownItems: null,
  },
  {
    Name: 'Apps',
    Link: 'test',
    Icon: RiGroupLine,
    DropdownItems: null,
  },
  {
    Name: 'Test',
    Link: 'test2',
    Icon: BsLightning,
    DropdownItems: null,
  },
  {
    Name: 'User List',
    BaseUrl: 'users',
    Icon: RiGroupLine,
    DropdownItems: [
      {Name: 'Employee List', Link: 'dasd'},
      {Name: 'View Employee', Link: 'eqwe'},
      {Name: 'New Employee', Link: 'aboudawqt'},
      {Name: 'Any', Link: 'wqeqw'},
    ],
  },
]
