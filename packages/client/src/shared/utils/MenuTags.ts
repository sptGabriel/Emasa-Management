import {IconType} from 'react-icons';
import {AiOutlineDashboard, AiOutlineLineChart} from 'react-icons/ai';
import {FaRegBuilding} from 'react-icons/fa';
import {TiGroupOutline} from 'react-icons/ti';
import {BsLightning, BsBookmarkPlus, BsFileEarmarkText} from 'react-icons/bs';
import {BiStoreAlt} from 'react-icons/bi';
import {RiGroupLine} from 'react-icons/ri';

export interface IDropdownItems {
  Name: string;
  Link: string;
}
export interface ITag {
  Title?: string;
  Name: string;
  Link: string;
  Icon: IconType;
  DropdownItems: IDropdownItems[] | null;
  Active?: boolean;
}
export const Tags: ITag[] = [
  {
    Title: 'DashBoard',
    Name: 'Default',
    Link: '../dashboards',
    Icon: AiOutlineDashboard,
    DropdownItems: null,
  },
  {
    Name: 'Analytic',
    Link: '../dashboards',
    Icon: AiOutlineLineChart,
    DropdownItems: null,
  },
  {
    Name: 'Inventory',
    Link: '../dashboards',
    Icon: BiStoreAlt,
    DropdownItems: null,
  },
  {
    Title: 'Pages',
    Name: 'Employees',
    Link: '../dashboards',
    Icon: TiGroupOutline,
    DropdownItems: [
      {Name: 'Employee List', Link: '/eloBost'},
      {Name: 'View Employee', Link: '/duoBoost'},
      {Name: 'New Employee', Link: '/eloBost'},
      {Name: 'Any', Link: '/duoBoost'},
    ],
  },
  {
    Name: 'Departaments',
    Link: '../dashboards',
    Icon: FaRegBuilding,
    DropdownItems: [
      {Name: 'Elo Boost', Link: '/eloBost'},
      {Name: 'Duo Boost', Link: '/duoBoost'},
      {Name: 'MD10', Link: '/eloBost'},
      {Name: 'Coaching', Link: '/duoBoost'},
      {Name: 'Vitóriais', Link: '/duoBoost'},
    ],
  },
  {
    Name: 'Products',
    Link: '../dashboards',
    Icon: BsLightning,
    DropdownItems: [
      {Name: 'Elo Boost', Link: '/eloBost'},
      {Name: 'Duo Boost', Link: '/duoBoost'},
      {Name: 'MD10', Link: '/eloBost'},
      {Name: 'Coaching', Link: '/duoBoost'},
      {Name: 'Vitóriais', Link: '/duoBoost'},
    ],
  },
  {
    Name: 'Suppliers',
    Link: '../dashboards',
    Icon: BsBookmarkPlus,
    DropdownItems: [
      {Name: 'Elo Boost', Link: '/eloBost'},
      {Name: 'Duo Boost', Link: '/duoBoost'},
      {Name: 'MD10', Link: '/eloBost'},
      {Name: 'Coaching', Link: '/duoBoost'},
      {Name: 'Vitóriais', Link: '/duoBoost'},
    ],
  },
  {
    Name: 'Contracts',
    Link: '../dashboards',
    Icon: BsFileEarmarkText,
    DropdownItems: [
      {Name: 'Elo Boost', Link: '/eloBost'},
      {Name: 'Duo Boost', Link: '/duoBoost'},
      {Name: 'MD10', Link: '/eloBost'},
      {Name: 'Coaching', Link: '/duoBoost'},
      {Name: 'Vitóriais', Link: '/duoBoost'},
    ],
  },
  {
    Name: 'User List',
    Link: '../dashboards',
    Icon: RiGroupLine,
    DropdownItems: [
      {Name: 'Elo Boost', Link: '/eloBost'},
      {Name: 'Duo Boost', Link: '/duoBoost'},
      {Name: 'MD10', Link: '/eloBost'},
      {Name: 'Coaching', Link: '/duoBoost'},
      {Name: 'Vitóriais', Link: '/duoBoost'},
    ],
  },
];
