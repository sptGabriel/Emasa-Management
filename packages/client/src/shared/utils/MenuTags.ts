import { IconType } from 'react-icons'
import { SiGoogleanalytics } from 'react-icons/si'
import {
  AiOutlineDashboard,
  AiOutlineShop,
  AiOutlineLineChart
} from 'react-icons/ai'
import { BsPersonBoundingBox } from 'react-icons/bs'

import { RiBuildingLine } from 'react-icons/ri'
import {
  FaFileContract,
  FaHandsHelping,
  FaTools,
  FaUsers
} from 'react-icons/fa'

export interface IDropdownItems {
  Name: string
  Link: string
}
export interface ITag {
  Title?: string
  Name: string
  Link: string
  Icon: IconType
  DropdownItems: IDropdownItems[] | null
  Active?: boolean
}

// export const DashBoardTags: ITag[] = [
//   {
//     Title: 'DashBoard',
//     Name: 'Default',
//     Link: '../dashboards',
//     Icon: AiOutlineDashboard,
//     DropdownItems: null
//   },
//   {
//     Name: 'Analytic',
//     Link: '../dashboards',
//     Icon: SiGoogleanalytics,
//     DropdownItems: null
//   },
//   {
//     Name: 'Inventory Management',
//     Link: '../dashboards',
//     Icon: AiOutlineShop,
//     DropdownItems: null
//   }
// ]

export const Tags: ITag[] = [
  {
    Title: 'DashBoard',
    Name: 'Default',
    Link: '../dashboards',
    Icon: AiOutlineDashboard,
    DropdownItems: null
  },
  {
    Name: 'Analytic',
    Link: '../dashboards',
    Icon: AiOutlineLineChart,
    DropdownItems: null
  },
  {
    Name: 'Inventory Management',
    Link: '../dashboards',
    Icon: AiOutlineShop,
    DropdownItems: null
  },
  {
    Title: 'Pages',
    Name: 'Employees',
    Link: '../dashboards',
    Icon: BsPersonBoundingBox,
    DropdownItems: [
      { Name: 'Elo Boost', Link: '/eloBost' },
      { Name: 'Duo Boost', Link: '/duoBoost' },
      { Name: 'MD10', Link: '/eloBost' },
      { Name: 'Coaching', Link: '/duoBoost' },
      { Name: 'Vitóriais', Link: '/duoBoost' }
    ]
  },
  {
    Name: 'Departaments',
    Link: '../dashboards',
    Icon: RiBuildingLine,
    DropdownItems: [
      { Name: 'Elo Boost', Link: '/eloBost' },
      { Name: 'Duo Boost', Link: '/duoBoost' },
      { Name: 'MD10', Link: '/eloBost' },
      { Name: 'Coaching', Link: '/duoBoost' },
      { Name: 'Vitóriais', Link: '/duoBoost' }
    ]
  },
  {
    Name: 'Products',
    Link: '../dashboards',
    Icon: FaTools,
    DropdownItems: [
      { Name: 'Elo Boost', Link: '/eloBost' },
      { Name: 'Duo Boost', Link: '/duoBoost' },
      { Name: 'MD10', Link: '/eloBost' },
      { Name: 'Coaching', Link: '/duoBoost' },
      { Name: 'Vitóriais', Link: '/duoBoost' }
    ]
  },
  {
    Name: 'Suppliers',
    Link: '../dashboards',
    Icon: FaHandsHelping,
    DropdownItems: [
      { Name: 'Elo Boost', Link: '/eloBost' },
      { Name: 'Duo Boost', Link: '/duoBoost' },
      { Name: 'MD10', Link: '/eloBost' },
      { Name: 'Coaching', Link: '/duoBoost' },
      { Name: 'Vitóriais', Link: '/duoBoost' }
    ]
  },
  {
    Name: 'Contracts',
    Link: '../dashboards',
    Icon: FaFileContract,
    DropdownItems: [
      { Name: 'Elo Boost', Link: '/eloBost' },
      { Name: 'Duo Boost', Link: '/duoBoost' },
      { Name: 'MD10', Link: '/eloBost' },
      { Name: 'Coaching', Link: '/duoBoost' },
      { Name: 'Vitóriais', Link: '/duoBoost' }
    ]
  },
  {
    Name: 'User List',
    Link: '../dashboards',
    Icon: FaUsers,
    DropdownItems: [
      { Name: 'Elo Boost', Link: '/eloBost' },
      { Name: 'Duo Boost', Link: '/duoBoost' },
      { Name: 'MD10', Link: '/eloBost' },
      { Name: 'Coaching', Link: '/duoBoost' },
      { Name: 'Vitóriais', Link: '/duoBoost' }
    ]
  }
]
